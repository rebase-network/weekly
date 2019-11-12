import {
  createContainer,
} from '@/util'
import Component from './Component'
import PostService from '@/service/PostService'
import CommentService from '@/service/CommentService'

export default createContainer(Component, (state) => {
  let page = 'PUBLIC' // default

  if (/^\/admin/.test(state.router.location.pathname)) {
    page = 'ADMIN'
  } else if (/^\/profile/.test(state.router.location.pathname)) {
    page = 'LEADER'
  }

  return {
    ...state.post,
    page,
    user: state.user,
    currentUserId: state.user.current_user_id,
    isCouncil: state.user.is_council,
    isAdmin: state.user.is_admin
  }
}, () => {
  const service = new PostService()
  const commentService = new CommentService()

  return {
    async getDetail({
      id,
      incViewsNum,
    }) {
      return service.getDetail({
        id,
        incViewsNum,
      })
    },
    async update(param) {
      return service.update(param)
    },
    async addTag(param) {
      return service.addTag(param)
    },
    resetDetail() {
      return service.resetDetail()
    },

    async reportAbuse(id) {
      return service.reportAbuse(id)
    },
    async subscribe(id) {
      return commentService.subscribe('post', id)
    },

    async unsubscribe(id) {
      return commentService.unsubscribe('post', id)
    },
    async needDueDiligence(id) {
      return service.needDueDiligence(id)
    },
    async needAdvisory(id) {
      return service.needAdvisory(id)
    }
  }
})
