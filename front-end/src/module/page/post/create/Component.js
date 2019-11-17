import React from 'react'
import MediaQuery from 'react-responsive'
import BackLink from '@/module/shared/BackLink/Component'
import PostForm from '@/module/form/PostForm/Component'
import I18N from '@/I18N'
import { LG_WIDTH } from '@/config/constant'
import Meta from '@/module/common/Meta'
import StandardPage from '../../StandardPage'

import { Container } from './style'

export default class extends StandardPage {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
    }
  }

  historyBack = () => {
    this.props.history.push('/')
  }

  onSubmit = (model) => {
    return this.props.createPost(model)
      .then(() => this.historyBack())
      .catch(err => this.setState({ error: err }))
  }

  ord_renderContent() {
    return (
      <div>
        <Meta
          title="Add Post Detail"
          url={this.props.location.pathname}
        />

        <Container className="c_PostDetail">
        <MediaQuery maxWidth={LG_WIDTH}>
            <div>
              <BackLink
                link="/"
                style={{ position: 'relative', left: 0, marginBottom: 15 }}
              />
            </div>
          </MediaQuery>
          <MediaQuery minWidth={LG_WIDTH + 1}>
            <BackLink link="/" />
          </MediaQuery>

          {/* <h2 className="komu-a cr-title-with-icon">
            {I18N.get('post.title.add')}
          </h2> */}
          <PostForm
            lang={this.props.lang}
            onSubmit={this.onSubmit}
            onCancel={this.historyBack}
            onSaveDraft={this.onSaveDraft}
          />
        </Container>
      </div>
    )
  }

}
