import React from 'react'
import _ from 'lodash'
import { Spin } from 'antd'
import MediaQuery from 'react-responsive'
import Footer from '@/module/layout/Footer/Container'
import BackLink from '@/module/shared/BackLink/Component'
import PostForm from '@/module/form/PostForm/Component'
import I18N from '@/I18N'
import { LG_WIDTH } from '@/config/constant'
import StandardPage from '../../StandardPage'
import Meta from '@/module/common/Meta'

import { Container } from './style'

export default class extends StandardPage {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.getDetail(_.get(this.props, 'match.params.id'))
      .then(data => this.setState({ data, loading: false }))
      .catch(err => this.setState({ error: err, loading: false }))
  }

  historyBack = () => {
    const id = this.state.data._id
    this.props.history.push(`/posts/${id}`)
  }

  onSubmit = (model) => {
    const id = this.state.data._id
    return this.props.updatePost({ id, ...model, update: true })
      .then(() => this.historyBack())
      .catch(err => this.setState({ error: err }))
  }

  ord_renderContent() {
    if (this.state.loading) {
      return (
        <div className="center">
          <Spin size="large" />
        </div>
      )
    }

    return (
      <div>
        <Meta
          title="Edit Post Detail"
          url={this.props.location.pathname}
        />

        <Container className="c_PostDetail">
          <MediaQuery maxWidth={LG_WIDTH}>
            <div>
              <BackLink
                link={`/posts/${_.get(this.props, 'match.params.id')}`}
                style={{ position: 'relative', left: 0, marginBottom: 15 }}
              />
            </div>
          </MediaQuery>
          <MediaQuery minWidth={LG_WIDTH + 1}>
            <BackLink link="/posts" />
          </MediaQuery>

          <div>
            <h2 className="komu-a cr-title-with-icon ">
              {I18N.get('post.title.edit')}
            </h2>
            <PostForm
              lang={this.props.lang}
              initialValues={this.state.data}
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
