import React from 'react'
import _ from 'lodash'
import {
  Row,
  Col,
  Spin,
  Input,
  Button,
} from 'antd'
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive'
import moment from 'moment/moment'
// import Comments from '@/module/common/comments/Container'
import BackLink from '@/module/shared/BackLink/Component'
import I18N from '@/I18N'
import { LG_WIDTH } from '@/config/constant'
import { logger } from '@/util'
import StandardPage from '../../StandardPage'
import Meta from '@/module/common/Meta'
import SocialShareButtons from '@/module/common/SocialShareButtons'
import MarkdownPreview from '@/module/common/MarkdownPreview'
import TagsContainer from '../common/tags/Container'
import PopoverProfile from '@/module/common/PopoverProfile'
import htmlToImage from 'html-to-image'

import {
  Container,
  Title,
  Detail,
  StyledButton,
} from './style'

export default class extends StandardPage {
  componentDidMount() {
    super.componentDidMount()
    this.refetch(true)
  }

  componentWillUnmount() {
    this.props.resetDetail()
  }

  ord_renderContent() {
    const { detail } = this.props
    if (_.isEmpty(detail) || detail.loading) {
      return (
        <div className="center">
          <Spin size="large" />
        </div>
      )
    }
    const detailNode = this.renderDetail()
    // const commentNode = this.renderCommentNode()
    // const socialShareButtonsNode = this.renderSocialShareButtonsNode()

    return (
      <div>
        <Meta
          desc={detail.shortDesc}
          title={`${detail.title} - Post Detail`}
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

          <Row gutter={24}>
            <Col span={24}>
              {detailNode}
              {/* {socialShareButtonsNode} */}
              {/* <div style={{ marginTop: 60 }}>{commentNode}</div> */}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }

  generateImg() {
    const node = document.getElementById('post-detail')
    console.log('node: ', node)
    const options = {
      // width: 420,
      style: {
      //   width: '420px',
      //   height: 'auto'
        fontSize: '20px'
      }
    }
    htmlToImage.toPng(node, options)
    .then(function(dataUrl) {
      const img = new Image()
      img.src = dataUrl
      document.body.appendChild(img)
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
    })
  }

  renderDetail() {
    const { detail } = this.props
    const titleNode = this.renderTitleNode()
    const ownerActionsNode = this.renderOwnerActionsNode()
    return (
      <div>
        <Detail id="post-detail">
          {titleNode}
          <MarkdownPreview content={detail.desc || ''} />
        </Detail>
        {ownerActionsNode}
      </div>
    )
  }

  renderSocialShareButtonsNode() {
    const { detail } = this.props
    return (
      <SocialShareButtons
        shareQuote={`${detail.title} - Post Detail`}
      />
    )
  }

  renderTitleNode() {
    const { detail } = this.props
    return <Title>{detail.title}</Title>
  }

  renderOwnerActionsNode() {
    const { detail, currentUserId } = this.props
    const isOwner = currentUserId === _.get(detail, 'createdBy._id')
    if (!isOwner) return null
    return (
      <div>
        <StyledButton
          onClick={this.goEdit}
        >
          {I18N.get('post.btnText.edit')}
        </StyledButton>
        <StyledButton
          onClick={this.generateImg}
        >
          {I18N.get('post.btnText.generateImg')}
        </StyledButton>
      </div>
    )
  }

  // renderCommentNode() {
  //   const { detail } = this.props
  //   return (
  //     <Comments
  //       id="comments"
  //       type="post"
  //       post={detail}
  //       canPost={true}
  //       model={detail._id}
  //       returnUrl={`/posts/${detail._id}`}
  //     />
  //   )
  // }

  onCommentChanged = e => {
    this.setState({ comment: e.target.value })
  }

  onFormSubmit = async param => {
    try {
      await this.props.update(param)
      this.goEdit()
      this.refetch()
    } catch (error) {
      logger.error(error)
    }
  }

  goEdit = () => {
    const id = _.get(this.props, 'match.params.id')
    this.props.history.push(`/posts/${id}/edit`)
  }

  refetch = async incViewsNum => {
    const id = _.get(this.props, 'match.params.id')
    await this.props.resetDetail()
    this.props.getDetail({ id, incViewsNum: !!incViewsNum })
  }
}
