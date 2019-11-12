import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import ForgotPasswordPage from '@/module/page/forgot_password/Container'
import ResetPasswordPage from '@/module/page/reset_password/Container'

import ProfileInfoPage from '@/module/page/profile/info/Container'

// post
import PostListPage from '@/module/page/post/list/Container'
import PostCreatePage from '@/module/page/post/create/Container'
import PostEditPage from '@/module/page/post/edit/Container'
import PostDetailPage from '@/module/page/post/detail/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
  {
    path: '/',
    page: PostListPage,
  },
  {
    path: '/home',
    page: PostListPage,
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
     * Post page
     ********************************************************************************
     */
  {
    path: '/posts',
    page: PostListPage,
  },
  {
    path: '/posts/create',
    page: PostCreatePage,
  },
  {
    path: '/posts/:id/edit',
    page: PostEditPage,
  },
  {
    path: '/posts/:id',
    page: PostDetailPage,
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

  // Other
  {
    page: NotFound,
  },
]
