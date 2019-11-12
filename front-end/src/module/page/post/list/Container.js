import {
  createContainer,
} from '@/util'
import {
  POST_STATUS
} from '@/constant'
import PostService from '@/service/PostService'
import CommentService from '@/service/CommentService'
import Component from './Component'

const mapState = (state) => {
  const currentUserId = state.user.current_user_id

  const postState = {
    ...state.post,
    tagsIncluded: state.post.tags_included,
    referenceStatus: state.post.reference_status,
    dataList: state.post.all_posts,
    total: state.post.all_posts_total,
    currentUserId,
    filter: state.post.filter || {},
    isLogin: state.user.is_login,
    user: state.user
  }

  return postState
}

const mapDispatch = () => {
  const service = new PostService()
  const commentService = new CommentService()

  return {
    async changePage(page) {
      return service.changePage(page)
    },

    async onSortByChanged(sortBy) {
      return service.saveSortBy(sortBy)
    },

    async getList(query) {

      query = Object.assign({
        status: POST_STATUS.ACTIVE
      }, query)

      return service.list(query)
    },

    async loadMore(query) {

      query = Object.assign({
        status: POST_STATUS.ACTIVE
      }, query)

      return service.loadMore(query)
    },

    resetAll() {
      return service.resetAll()
    },

    async create(doc) {
      return service.create(doc)
    },

    async subscribe(id) {
      return commentService.subscribe('post', id)
    },

    async unsubscribe(id) {
      return commentService.unsubscribe('post', id)
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
