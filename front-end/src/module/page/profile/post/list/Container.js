import _ from 'lodash'
import { createContainer } from '@/util'
import { POST_STATUS } from '@/constant'
import PostService from '@/service/PostService'
import Component from './Component'

const mapState = (state) => {
  const currentUserId = state.user.current_user_id
  const postState = {
    ...state.post,
    dataList: state.post.my_posts,
    total: state.post.my_posts_total,
    currentUserId,
    filter: state.post.filter || {},
  }

  return postState
}

const mapDispatch = () => {
  const service = new PostService()

  return {
    async getList(query) {
      return service.myList(query)
    },

    resetAll() {
      return service.resetMyList()
    },
  }
}

export default createContainer(Component, mapState, mapDispatch)
