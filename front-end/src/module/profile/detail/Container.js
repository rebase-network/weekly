import { createContainer } from '@/util'
import Component from './Component'
import UserService from '@/service/UserService'
import CommentService from '@/service/CommentService'

export default createContainer(Component, state => ({
  currentUserId: state.user.current_user_id,
  is_login: state.user.is_login,
  loading: state.member.loading,
  subscribing: state.member.subscribing,
  member: state.member.detail,
  teams: state.team.all_teams,
  tasks: state.task.all_tasks,
  loadingList: state.team.loading || state.task.loading,
}), () => {
  const userService = new UserService()
  const commentService = new CommentService()

  return {
    async getMember(userId) {
      return userService.getMember(userId)
    },

    resetMemberDetail() {
      return userService.resetMemberDetail()
    },

    async subscribe(type, parentId) {
      await commentService.subscribe(type, parentId, 'member')
    },

    async unsubscribe(type, parentId) {
      await commentService.unsubscribe(type, parentId, 'member')
    },
  }
})
