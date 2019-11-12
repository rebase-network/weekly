import {
  createContainer,
} from '@/util'
import Component from './Component'
import PostService from '@/service/PostService'

export default createContainer(Component, (state) => {
  return {
    currentUserId: state.user.current_user_id,
    isCouncil: state.user.is_council,
    isAdmin: state.user.is_admin
  }
}, () => {
  const service = new PostService()

  return {
    getDetail(id) {
      return service.getDetail({
        id,
        incViewsNum: false,
      })
    },
    updatePost(post) {
      return service.update(post)
    }
  }
})
