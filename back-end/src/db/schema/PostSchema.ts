import { Schema } from 'mongoose'
import { CommentSchema } from './CommentSchema'
import { SubscriberSchema } from './SubscriberSchema'
import { constant } from '../../constant'
import * as _ from 'lodash'

const PostCore = {
  title: {
    type: String
  },
  descUpdatedAt: Date,

  desc: {
    type: String
  },
}

export const Post = {
  ...PostCore,
  likes: {
    type: [Schema.Types.ObjectId],
    default: []
  },
  likesNum: {
    type: Number,
    default: 0
  },
  viewsNum: {
    type: Number,
    default: 0
  },
  comments: [[CommentSchema]],
  commentsNum: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  // constans.POST_STATUS: ACTIVE, ABUSED, ARCHIVED. abuse will also be archived
  status: {
    type: String,
    uppercase: true,
    enum: _.values(constant.POST_STATUS),
    default: constant.POST_STATUS.PUBLISHED
  },
  subscribers: [SubscriberSchema],
}
