import {
  createContainer,
} from '@/util'
import Component from './Component'
import PostService from '@/service/PostService'

const mapState = state => ({
  loading: state.post.loading
})

const mapDispatch = () => {
  const postService = new PostService()
  return {
    async create(param) {
      return postService.create(param)
    },
    async update(param) {
      return postService.update(param)
    }
  }
}

export default createContainer(Component, mapState, mapDispatch)
