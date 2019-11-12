// import LandingPage from '@/module/page/landing/Container'
import HomePage from '@/module/page/home/Container'

import TasksPage from '@/module/page/tasks/Container'
import TaskDetailPage from '@/module/page/task_detail/Container'
import TaskApplicationPage from '@/module/page/task_application/Container'

import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import ForgotPasswordPage from '@/module/page/forgot_password/Container'
import ResetPasswordPage from '@/module/page/reset_password/Container'

import ProfileInfoPage from '@/module/page/profile/info/Container'
import ProfileTasksPage from '@/module/page/profile/tasks/Container'
import TaskCreatePage from '@/module/page/task_create/Container'

// suggestion
import SuggestionListPage from '@/module/page/suggestion/list/Container'
import SuggestionCreatePage from '@/module/page/suggestion/create/Container'
import SuggestionEditPage from '@/module/page/suggestion/edit/Container'
import SuggestionDetailPage from '@/module/page/suggestion/detail/Container'
import SuggestionEditHistoryPage from '@/module/page/suggestion/edit_history/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
  {
    path: '/',
    page: HomePage,
  },
  {
    path: '/home',
    page: HomePage,
  },
  {
    path: '/tasks',
    page: TasksPage,
  },
  {
    path: '/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/admin/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/task-app/:taskId/:applicantId',
    page: TaskApplicationPage,
  },
  {
    path: '/task-create',
    page: TaskCreatePage,
  },
  /*
    ********************************************************************************
    * Login/Register
    ********************************************************************************
      */
  {
    path: '/login',
    page: LoginPage,
  },
  {
    path: '/register',
    page: RegisterPage,
  },
  {
    path: '/forgot-password',
    page: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    page: ResetPasswordPage,
  },
  /*
     ********************************************************************************
     * Suggestion page
     ********************************************************************************
     */
  {
    path: '/suggestion',
    page: SuggestionListPage,
  },
  {
    path: '/suggestion/create',
    page: SuggestionCreatePage,
  },
  {
    path: '/suggestion/:id/edit',
    page: SuggestionEditPage,
  },
  {
    path: '/suggestion/:id',
    page: SuggestionDetailPage,
  },
  {
    path: '/suggestion/history/:id',
    page: SuggestionEditHistoryPage,
  },
  /*
    ********************************************************************************
    * Profile page
    ********************************************************************************
      */
  {
    path: '/profile/info',
    page: ProfileInfoPage,
  },
  {
    path: '/profile/tasks',
    page: ProfileTasksPage,
  },
  {
    path: '/profile/task-detail/:taskId',
    page: TaskDetailPage,
  },
  {
    path: '/profile/project-detail/:taskId',
    page: TaskDetailPage,
  },

  // Other
  {
    page: NotFound,
  },
]
