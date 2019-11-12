import Base from './Base'
import * as _ from 'lodash'
import { constant } from '../constant'
import { validate, mail, user as userUtil, logger } from '../utility'

const BASE_FIELDS = ['title', 'type', 'abstract', 'goal', 'motivation', 'relevance', 'budget', 'plan']

export default class extends Base {
  private model: any
  protected init() {
    this.model = this.getDBModel('Post')
  }

  public async create(param: any): Promise<Document> {
    const doc = {
      ...param,
      createdBy: _.get(this.currentUser, '_id'),
      contentType: constant.CONTENT_TYPE.MARKDOWN,
      // this is a hack for now, we should really be using aggregate pipeline + projection
      // in the sort query
      descUpdatedAt: new Date()
    }
    // save the document
    const result = await this.model.save(doc)
    await this.getDBModel('Post_Edit_History').save({ ...param, post: result._id })

    return result
  }

  public async update(param: any): Promise<Document> {
    const { id, update } = param
    const userId = _.get(this.currentUser, '_id')
    const currDoc = await this.model.getDBInstance().findById(id)

    if (!currDoc) {
      throw 'Current document does not exist'
    }

    if (!userId.equals(_.get(currDoc, 'createdBy'))) {
      throw 'Only owner can edit post'
    }

    const doc = _.pick(param, BASE_FIELDS);
    doc.descUpdatedAt = new Date()
    if (update) {
      await Promise.all([
        this.model.update({ _id: id }, { $set: doc }),
        this.getDBModel('Post_Edit_History').save({ ...doc, post: id })
      ])
    } else {
      await this.model.update({ _id: id }, { $set: doc })
    }
    return this.show({ id })
  }

  public async list(param: any): Promise<Object> {
    const query = _.omit(
      param,
      [
        'results', 'page', 'sortBy', 'sortOrder',
        'filter', 'search',
      ]
    )
    const { sortBy, sortOrder } = param

    let cursor: any
    // posts on post list page
    if (sortBy) {
      const sortObject = {}
      // hack to prioritize descUpdatedAt if it's createdAt
      if (sortBy === 'createdAt') {
        sortObject['descUpdatedAt'] = _.get(constant.SORT_ORDER, sortOrder, constant.SORT_ORDER.DESC)
      }
      sortObject[sortBy] = _.get(constant.SORT_ORDER, sortOrder, constant.SORT_ORDER.DESC)

      const excludedFields = [
        '-comments', '-subscribers', '-likes', '-dislikes', '-updatedAt'
      ]

      cursor = this.model.getDBInstance()
        .find(query, excludedFields.join(' '))
        .populate('createdBy', constant.DB_SELECTED_FIELDS.USER.NAME_EMAIL)
        .sort(sortObject)
    } else {
      // my posts on profile page
      cursor = this.model.getDBInstance()
        .find(query, 'title commentsNum createdAt dislikesNum displayId likesNum')
    }

    if (param.results) {
      const results = parseInt(param.results, 10)
      const page = parseInt(param.page, 10)
      cursor.skip(results * (page - 1)).limit(results)
    }

    const rs = await Promise.all([
      cursor,
      this.model.getDBInstance().find(query).count()
    ])

    return {
      list: rs[0],
      total: rs[1]
    }
  }

  public async show(param: any): Promise<Document> {
    const { id: _id, incViewsNum } = param
    if (incViewsNum === 'true') {
      await this.model.findOneAndUpdate({ _id }, {
        $inc: { viewsNum: 1, activeness: 1 }
      })
    }
    const doc = await this.model.getDBInstance()
      .findById(_id)
      .populate('createdBy', constant.DB_SELECTED_FIELDS.USER.NAME_EMAIL)

    if (_.isEmpty(doc.comments)) return doc

    for (const comment of doc.comments) {
      for (const thread of comment) {
        await this.model.getDBInstance().populate(thread, {
          path: 'createdBy',
          select: `${constant.DB_SELECTED_FIELDS.USER.NAME} profile.avatar`
        })
      }
    }

    return doc
  }

  public async editHistories(param: any): Promise<Document[]> {
    return await this.getDBModel('Post_Edit_History').find({post: param.id})
  }

  // like or unlike
  public async like(param: any): Promise<Document> {
    const { id: _id } = param
    const userId = _.get(this.currentUser, '_id')
    const doc = await this.model.findById(_id)
    const { likes, dislikes } = doc

    // can not both like and dislike, use ObjectId.equals to compare
    if (_.findIndex(dislikes, oid => userId.equals(oid)) !== -1) return doc

    // already liked, will unlike, use ObjectId.equals to compare
    if (_.findIndex(likes, oid => userId.equals(oid)) !== -1) {
      await this.model.findOneAndUpdate({ _id }, {
        $pull: { likes: userId },
        $inc: { likesNum: -1, activeness: -1 }
      })
    } else {
      // not like yet, will like it
      await this.model.findOneAndUpdate({ _id }, {
        $push: { likes: userId },
        $inc: { likesNum: 1, activeness: 1 }
      })
    }

    return this.model.findById(_id)
  }
  // dislike <=> undislike
  // can not both like and dislike
  public async dislike(param: any): Promise<Document> {
    const { id: _id } = param
    const userId = _.get(this.currentUser, '_id')
    const doc = await this.model.findById(_id)
    const { likes, dislikes } = doc

    // can not both like and dislike, use ObjectId.equals to compare
    if (_.findIndex(likes, oid => userId.equals(oid)) !== -1) return doc

    // already liked, will unlike, use ObjectId.equals to compare
    if (_.findIndex(dislikes, oid => userId.equals(oid)) !== -1) {
      await this.model.findOneAndUpdate({ _id }, {
        $pull: { dislikes: userId },
        $inc: { dislikesNum: -1, activeness: -1 }
      })
    } else {
      // not like yet, will like it
      await this.model.findOneAndUpdate({ _id }, {
        $push: { dislikes: userId },
        $inc: { dislikesNum: 1, activeness: 1 }
      })
    }

    return this.model.findById(_id)
  }

  /**
   * Council only
   */
  private async notifySubscribers(postId: String) {
    try {
      const db_user = this.getDBModel('User');
      const currentUserId = _.get(this.currentUser, '_id')
      const councilMember = await db_user.findById(currentUserId)
      const post = await this.model.getDBInstance().findById(postId)
        .populate('subscribers.user', constant.DB_SELECTED_FIELDS.USER.NAME_EMAIL)
        .populate('createdBy', constant.DB_SELECTED_FIELDS.USER.NAME_EMAIL)

      // get users: creator and subscribers
      const toUsers = _.map(post.subscribers, 'user') || []
      toUsers.push(post.createdBy)
      const toMails = _.map(toUsers, 'email')

      const subject = 'The post is under consideration of Council.'
      const body = `
      <p>Council member ${userUtil.formatUsername(councilMember)} has marked this post ${post.title} as "Under Consideration"</p>
      <br />
      <p>Click this link to view more details: <a href="${process.env.SERVER_URL}/post/${post._id}">${process.env.SERVER_URL}/post/${post._id}</a></p>
      <br /> <br />
      <p>Thanks</p>
      <p>Cyber Republic</p>
    `

      const recVariables = _.zipObject(toMails, _.map(toUsers, (user) => {
        return {
          _id: user._id,
          username: userUtil.formatUsername(user)
        }
      }))

      const mailObj = {
        to: toMails,
        // toName: ownerToName,
        subject,
        body,
        recVariables,
      }

      mail.send(mailObj)
    } catch(error) {
      logger.error(error)
    }
  }

  private async notifyOwner(postId: String, desc: String) {
    try {
      const db_user = this.getDBModel('User');
      const currentUserId = _.get(this.currentUser, '_id')
      const councilMember = await db_user.findById(currentUserId)
      const post = await this.model.getDBInstance().findById(postId)
      .populate('createdBy', constant.DB_SELECTED_FIELDS.USER.NAME_EMAIL)

      // get users: creator and subscribers
      const toUsers = [post.createdBy]
      const toMails = _.map(toUsers, 'email')

      const subject = 'Your post needs more info for Council.'
      const body = `
        <p>Council member ${userUtil.formatUsername(councilMember)} has marked your post ${post.title} as "Need more information".</p>
        <br />
        <p>"${desc}"</p>
        <br />
        <p>Click this link to view more details: <a href="${process.env.SERVER_URL}/post/${post._id}">${process.env.SERVER_URL}/post/${post._id}</a></p>
        <br /> <br />
        <p>Thanks</p>
        <p>Cyber Republic</p>
      `

      const recVariables = _.zipObject(toMails, _.map(toUsers, (user) => {
        return {
          _id: user._id,
          username: userUtil.formatUsername(user)
        }
      }))

      const mailObj = {
        to: toMails,
        // toName: ownerToName,
        subject,
        body,
        recVariables,
      }

      mail.send(mailObj)
    } catch (error) {
      logger.error(error)
    }
  }

  public async addTag(param: any): Promise<Document> {
    try {
      const { id: _id, type, desc } = param
      const currDoc = await this.model.getDBInstance().findById(_id)

      if (!currDoc) {
        throw 'Current document does not exist'
      }

      if (_.findIndex(currDoc.tags, (tagObj: any) => tagObj.type === type) !== -1) return currDoc

      const tag: any = {
        type,
        createdBy: _.get(this.currentUser, '_id'),
      }
      if (desc) tag.desc = desc
      const updateObject = {
        $addToSet: { tags: tag }
      }

      await this.model.findOneAndUpdate({ _id }, updateObject)
      return this.model.findById(_id)
    } catch(error) {
      logger.error(error)
    }
  }

  public async delete(param: any): Promise<Document> {
    const { id: _id } = param
    return this.model.findByIdAndDelete(_id)
  }

  /**
   * Utils
   */
  public validateTitle(title: String) {
    if (!validate.valid_string(title, 4)) {
      throw 'invalid title'
    }
  }

  public validateDesc(desc: String) {
    if (!validate.valid_string(desc, 1)) {
      throw 'invalid description'
    }
  }
}
