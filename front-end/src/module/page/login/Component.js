import React from 'react'
import LoginOrRegisterForm from '@/module/form/LoginOrRegisterForm/Container'

import './style.scss'

import StandardPage from '../StandardPage'

export default class extends StandardPage {
  ord_renderContent() {
    return (
      <div className="p_login ebp-wrap">
        <LoginOrRegisterForm />
      </div>
    )
  }

  ord_checkLogin(isLogin) {
    if (isLogin) {
      this.props.history.replace('/profile')
    }
  }
}
