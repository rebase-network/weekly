import LoginPage from '@/module/page/login/Container'
import RegisterPage from '@/module/page/register/Container'
import ForgotPasswordPage from '@/module/page/forgot_password/Container'
import ResetPasswordPage from '@/module/page/reset_password/Container'

import ProfileInfoPage from '@/module/page/profile/info/Container'

// suggestion
import SuggestionListPage from '@/module/page/suggestion/list/Container'
import SuggestionCreatePage from '@/module/page/suggestion/create/Container'
import SuggestionEditPage from '@/module/page/suggestion/edit/Container'
import SuggestionDetailPage from '@/module/page/suggestion/detail/Container'

import NotFound from '@/module/page/error/NotFound'

export default [
  {
    path: '/',
    page: SuggestionListPage,
  },
  {
    path: '/home',
    page: SuggestionListPage,
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
