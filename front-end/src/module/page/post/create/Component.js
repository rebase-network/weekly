import React from 'react'
import MediaQuery from 'react-responsive'
import Footer from '@/module/layout/Footer/Container'
import BackLink from '@/module/shared/BackLink/Component'
import PostForm from '@/module/form/PostForm/Component'
import I18N from '@/I18N'
import { LG_WIDTH } from '@/config/constant'
import Meta from '@/module/common/Meta'
import StandardPage from '../../StandardPage'

import { Container, Title } from './style'

const LOCALSTORAGE_DRAFT = 'draft-post';

export default class extends StandardPage {
  constructor(props) {
    super(props)

    const draftPost = localStorage.getItem(LOCALSTORAGE_DRAFT);
    this.state = {
      error: null,
      draftPost: draftPost ? JSON.parse(draftPost) : {}
    }
  }

  historyBack = () => {
    this.props.history.push('/')
  }

  onSubmit = (model) => {
    return this.props.createPost(model)
      .then(() => this.historyBack())
      .then(() => localStorage.removeItem(LOCALSTORAGE_DRAFT))
      .catch(err => this.setState({ error: err }))
  }

  onSaveDraft = (model) => {
    localStorage.setItem(LOCALSTORAGE_DRAFT, JSON.stringify(model));
  }

  ord_renderContent() {
    return (
      <div>
        <Meta
          title="Add Post Detail"
          url={this.props.location.pathname}
        />

        <Container className="c_PostDetail">
          <div>
            <h2 className="komu-a cr-title-with-icon">
              {I18N.get('post.title.add')}
            </h2>
            <PostForm
              lang={this.props.lang}
              initialValues={this.state.draftPost}
              onSubmit={this.onSubmit}
              onCancel={this.historyBack}
              onSaveDraft={this.onSaveDraft}
            />
          </div>
        </Container>
        <Footer />
      </div>
    )
  }

}
