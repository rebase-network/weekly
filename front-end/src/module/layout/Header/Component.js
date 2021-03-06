import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Layout, Menu, Icon,  Modal, Dropdown } from 'antd'
import _ from 'lodash'
import I18N from '@/I18N'
import MediaQuery from 'react-responsive'
import { MAX_WIDTH_MOBILE, MIN_WIDTH_PC } from '@/config/constant'
import { USER_ROLE, USER_LANGUAGE } from '@/constant'
import Flag from 'react-flags'
import Data from '@/config/data'
import UserEditForm from '@/module/form/UserEditForm/Container'

const { Header } = Layout

const Hamburger = () => (
  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H14V1H0V0ZM0 5H14V6H0V5ZM14 10H0V11H14V10Z" fill="black" />
  </svg>
)

export default class extends BaseComponent {
  constructor() {
    super()

    this.state = {
      affixed: false,
      popover: false,
      completing: false,
    }
  }

  renderCompleteProfileModal() {
    return (
      <Modal
        className="project-detail-nobar"
        visible={this.state.completing}
        onOk={this.onCompleteProfileModalOk.bind(this)}
        onCancel={this.onCompleteProfileModalCancel.bind(this)}
        footer={null}
        width="70%"
      >
        {this.state.completing
      && (
        <UserEditForm
          user={this.props.user}
          switchEditMode={this.onCompleteProfileModalCancel.bind(this)}
          completing={true}
        />
      )
        }
      </Modal>
    )
  }

  onCompleteProfileModalOk() {
    this.setState({
      completing: false,
    })
  }

  onCompleteProfileModalCancel() {
    this.setState({
      completing: false,
    })
  }

  buildAcctDropdown() {
    const isLogin = this.props.isLogin

    return (
      <Menu onClick={this.clickItem}>
        {isLogin
          ? (
            <Menu.Item key="profile">
              {I18N.get('header.profile')}
            </Menu.Item>
          )
          : (
            <Menu.Item key="login">
              {I18N.get('login.title')}
            </Menu.Item>
          )
        }
        {!isLogin
          && (
            <Menu.Item key="register">
              {I18N.get('register.title')}
            </Menu.Item>
          )
        }
        {isLogin
          && (
            <Menu.Item key="logout">
              {I18N.get('header.logout')}
            </Menu.Item>
          )
        }
      </Menu>
    )
  }

  buildLanguageDropdown() {
    const menu = (
      <Menu onClick={this.clickItem} className="language-menu">
        <Menu.Item key="en">
          <div>
            <Flag
              name="US"
              format="png"
              basePath="/assets/images/flags"
              pngSize={24}
              shiny={true}
              alt="English"
            />
            <span className="language-us">English</span>
          </div>
        </Menu.Item>
        <Menu.Item key="zh">
          <div>
            <Flag
              name="CN"
              format="png"
              basePath="/assets/images/flags"
              pngSize={24}
              shiny={true}
              alt="English"
            />
            <span className="language-cn">简体中文</span>
          </div>
        </Menu.Item>
      </Menu>
    )

    return (
      <Dropdown overlay={menu} placement="bottomCenter">
        <a className="ant-dropdown-link">
          <Flag
            name={Data.mappingLanguageKeyToName[this.props.lang]}
            format="png"
            basePath="/assets/images/flags"
            pngSize={24}
            shiny={true}
            alt="English"
          />
        </a>
      </Dropdown>
    )
  }

  getSelectedKeys() {
    return _.map(['profile', 'home', 'posts/create'], key => (((this.props.pathname || '').indexOf(`/${key}`) === 0) ? key : ''))
  }

  ord_render() {
    return (
      <Header className="c-header">
        Markdown -> 图片
        {/* <Menu
          theme="dark"
          onClick={this.clickItem}
          className="c-header_Menu pull-left"
          selectedKeys={this.getSelectedKeys()}
          mode="horizontal"
        >
          <Menu.Item className="c_MenuItem logo" key="home">
            Convert Markdown to Image
            <MediaQuery minWidth={MIN_WIDTH_PC}>
              <img src="/assets/images/arrow-h.png" alt="Weekly" />
            </MediaQuery>
            <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
              <img src="/assets/images/arrow-h.png" alt="Weekly"/>
            </MediaQuery>
            <div className="alpha-tag dsk">ALPHA</div>
          </Menu.Item>
          <Menu.Item key="posts/create">
            {I18N.get('post.title.add')}
          </Menu.Item>
          <Menu.Item key="profile">
            {I18N.get('header.profile')}
          </Menu.Item>
        </Menu>
        <Menu
          onClick={this.clickItem}
          className="c-header_Menu pull-right"
          selectedKeys={this.getSelectedKeys()}
          mode="horizontal"
        >
          {this.props.isLogin
            ? (
              <Menu.Item className="c_MenuItem link" key="profile">
                {I18N.get('header.profile')}
              </Menu.Item>
            ) : (
              <Menu.Item className="c_MenuItem link" key="login">
                {I18N.get('login.title')}
              </Menu.Item>
            )
        }
        </Menu>
        <div className="clearfix" />
        {this.renderProfileToast()}
        {this.renderCompleteProfileModal()} */}
      </Header>
    )
  }

  completeProfile = () => {
    this.setState({
      completing: true,
    })
  }

  dismissToast = () => {
    this.setState({
      dismissed: true,
    })

    localStorage.setItem('complete-profile-dismissed', true)
  }

  isPermanentlyDismissed() {
    return localStorage.getItem('complete-profile-dismissed')
  }

  renderProfileToast() {
    const isShow = !this.state.dismissed
      && !this.isPermanentlyDismissed()
      && this.props.isLogin
      && this.hasIncompleteProfile()

    return isShow && (
      <div className="top-toast">
        <a onClick={this.completeProfile}>
          {I18N.get('profile.complete')}
          <Icon type="right" style={{ marginLeft: 8 }} />
        </a>
        <a className="pull-right toast-close-container" onClick={this.dismissToast}>
          <Icon type="close" />
        </a>
      </div>
    )
  }

  hasIncompleteProfile() {
    const requiredProps = [
      'profile.firstName',
      'profile.lastName',
      'profile.timezone',
      'profile.country',
      'profile.bio',
      'profile.skillset',
      'profile.profession',
    ]

    return !_.every(requiredProps, prop => _.has(this.props.user, prop)
      && !_.isEmpty(_.get(this.props.user, prop)))
  }

  clickItem = (e) => {
    const { key } = e
    const { isLogin } = this.props

    if (_.includes([
      'home',
      'login',
      'register',
      'signup',
      'profile',
      'posts/create',
    ], key)) {
      this.props.history.push(`/${e.key}`)
    } else if (key === 'logout') {
      Modal.confirm({
        title: I18N.get('logout.title'),
        content: '',
        okText: I18N.get('.yes'),
        okType: 'danger',
        cancelText: I18N.get('.no'),
        onOk: () => {
          this.props.logout()
        },
        onCancel() {
        },
      })
    } else if (_.includes([
      'en',
      'zh',
    ], key)) {
      this.props.changeLanguage(e.key)
    }
  }
}
