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
import Footer from '@/module/layout/Footer/Container'
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
import {
  Container,
  Title,
  DescLabel,
  StyledButton,
} from './style'

export default class extends StandardPage {
  constructor(props) {
    super(props)

    // we use the props from the redux store if its retained
    this.state = {
      isDropdownActionOpen: false,
      showMobile: false,
      showForm: false,
      needsInfoVisible: false,
      proposeLoading: false
    }
  }

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
    const ownerActionsNode = this.renderOwnerActionsNode()
    // const commentNode = this.renderCommentNode()
    const socialShareButtonsNode = this.renderSocialShareButtonsNode()

    return (
      <div>
        <Meta
          desc={detail.shortDesc}
          title={`${detail.title} - Post Detail`}
          url={this.props.location.pathname}
        />

        <Container className="c_PostDetail">
        <BackLink
          link="/"
          style={{ position: 'fixed', left: '27px', top: '189px' }}
        />
          <Row gutter={24}>
            <Col span={24}>
              {detailNode}
              {socialShareButtonsNode}
              {ownerActionsNode}
              {/* <div style={{ marginTop: 60 }}>{commentNode}</div> */}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    )
  }

  renderDetail() {
    const { detail } = this.props
    // const metaNode = this.renderMetaNode()
    const titleNode = this.renderTitleNode()
    // const labelNode = this.renderLabelNode()
    // const tagsNode = this.renderTagsNode()

    return (
      <div>
        {/* {metaNode} */}
        {titleNode}
        {/* <div style={{ margin: '14px 0' }}>{labelNode}</div>
        <div>{tagsNode}</div> */}

        <MarkdownPreview content={detail.desc || ''} />
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
    const { detail, currentUserId, isAdmin } = this.props
    const isOwner = currentUserId === _.get(detail, 'createdBy._id') || isAdmin
    const res = isOwner && (
      <StyledButton
        type="ebp"
        className="cr-btn cr-btn-default"
        onClick={this.showEditForm}
      >
        {I18N.get('post.btnText.edit')}
      </StyledButton>
    )
    return res
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
      this.showEditForm()
      this.refetch()
    } catch (error) {
      logger.error(error)
    }
  }

  showEditForm = () => {
    const id = _.get(this.props, 'match.params.id')
    this.props.history.push(`/posts/${id}/edit`)
  }

  showDropdownActions = () => {
    const { isDropdownActionOpen } = this.state
    this.setState({
      isDropdownActionOpen: !isDropdownActionOpen
    })
  }

  refetch = async incViewsNum => {
    const id = _.get(this.props, 'match.params.id')
    await this.props.resetDetail()
    this.props.getDetail({ id, incViewsNum: !!incViewsNum })
  }
}
