import {
  createContainer,
} from '@/util'
import {
  POST_STATUS,
} from '@/constant'
import PostService from '@/service/PostService'
import Component from './Component'

const mapState = (state) => {
  const currentUserId = state.user.current_user_id
  // const isAdmin = state.user.role === USER_ROLE.ADMIN
  const {
    my_posts_loading: loading,
    my_posts: dataList,
    my_posts_total: total,
  } = state.post
  const postState = {
    ...state.post,
    dataList,
    total,
    loading,
    currentUserId,
  }

  return postState
}

const mapDispatch = () => {
  const service = new PostService()

  return {
    async getList(query) {
      return service.myList({
        status: POST_STATUS.ACTIVE,
        ...query,
      })
    },
    resetAll() {
      return service.resetMyList()
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
