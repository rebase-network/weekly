import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import styled from 'styled-components'
import {
  Pagination, Modal, Button, Col, Row, Select, Spin, Checkbox
} from 'antd'
import I18N from '@/I18N'
import { loginRedirectWithQuery, logger } from '@/util'
import StandardPage from '@/module/page/StandardPage'
import Footer from '@/module/layout/Footer/Container'
import { breakPoint } from '@/constants/breakPoint'
import MarkdownPreview from '@/module/common/MarkdownPreview'

// import {} from './style'

const SORT_BY = {
  createdAt: 'createdAt',
  likesNum: 'likesNum',
  activeness: 'activeness',
  viewsNum: 'viewsNum'
}
const DEFAULT_SORT = SORT_BY.createdAt

export default class extends StandardPage {
  constructor(props) {
    super(props)

    // we use the props from the redux store if its retained
    this.state = {
      results: 10,
      total: 0,
      search: '',
      filter: ''
    }
    // this.debouncedRefetch = _.debounce(this.refetch.bind(this), 300)
  }

  componentDidMount() {
    super.componentDidMount()
    this.refetch()
  }

  componentWillUnmount() {
    this.props.resetAll()
  }


  ord_renderContent() {
    const headerNode = this.renderHeader()
    const listNode = this.renderList()

    return (
      <div>
        <div className="post-header">
          {headerNode}
        </div>
        <PostContainer className="p_PostList">
          <Row
            type="flex"
            justify="space-between"
            align="middle"
            style={{margin: '24px 0 48px'}}
          >
            <Col xs={24} sm={12} style={{textAlign: 'right', paddingTop: 24}}>
              <Button onClick={this.goCreate} className="btn-create-post">
                {I18N.get('post.add')}
              </Button>
            </Col>
          </Row>

          <Row gutter={24} style={{marginTop: 32}}>
            <Col span={24}>
              {listNode}
            </Col>
          </Row>
        </PostContainer>
        <Footer />
      </div>
    )
  }

  goCreate = () => {
    const { isLogin, history } = this.props
    if (!isLogin) {
      // const query = { create: true }
      // loginRedirectWithQuery({ query })
      history.push('/login')
      return
    }
    this.props.history.push('/posts/create')
  }

  renderHeader() {
    return (
      <div>
        <PostContainer
          className="title komu-a cr-title-with-icon">
          {this.props.header || I18N.get('post.title.allPosts').toUpperCase()}
        </PostContainer>
      </div>
    )
  }

  renderList() {
    const {dataList, loading} = this.props
    const loadingNode = <div className="center"><Spin size="large"/></div>
    const paginationNode = this.renderPagination()
    let result = loadingNode
    if (!loading) {
      if (_.isEmpty(dataList)) {
        result = <NoData>{I18N.get('post.nodata')}</NoData>
      } else {
        result = _.map(dataList, data => this.renderItem(data))
      }
    }

    return (
      <div>
        <div className="list-container">
          {result}
        </div>
        {paginationNode}
      </div>
    )
  }

  renderItem = (data) => {
    const href = `/posts/${data._id}`
    // const metaNode = this.renderMetaNode(data)
    const title = <ItemTitle to={href}>{data.title}</ItemTitle>
    // const tagsNode = this.renderTagsNode(data)
    return (
      <div key={data._id} className="item-container">
        {/* {metaNode} */}
        {title}
        {/* {tagsNode} */}
        <ShortDesc>
          <MarkdownPreview content={data.desc} />
        </ShortDesc>
      </div>
    )
  }

  onPageChanged = (page) => {
    const { changePage } = this.props
    changePage(page)
    this.loadPage(page)
  }

  renderPagination() {
    const { total, page } = this.props
    const { results } = this.state
    const props = {
      pageSize: results,
      total,
      current: page,
      onChange: this.onPageChanged,
    }
    return <Pagination {...props} className="cr-pagination" />
  }

  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const sortBy = this.props.sortBy || DEFAULT_SORT
    const { page } = this.props
    const { results, search, filter } = this.state
    const query = {
      page,
      results
    }

    // TODO
    if (sortBy) {
      query.sortBy = sortBy
    }

    if (search) {
      query.search = search
    }

    if (filter) {
      query.filter = filter
    }
    return query
  }

  /**
   * Refetch the data based on the current state retrieved from getQuery
   */
  refetch = () => {
    const query = this.getQuery()
    this.props.getList(query)
  }

  loadPage = async (page) => {
    const query = {
      ...this.getQuery(),
      page,
      results: this.state.results,
    }

    this.setState({ loadingMore: true })

    try {
      await this.props.loadMore(query)
    } catch (e) {
      // Do not update page in state if the call fails
      logger.error(e)
    }

    this.setState({ loadingMore: false })
  }

  gotoDetail(id) {
    this.props.history.push(`/posts/${id}`)
  }
}

const ItemTitle = styled(Link)`
  font-size: 20px;
  color: black;
  transition: all 0.3s;
  font-weight: 400;
  text-decoration: none;
  margin: 8px 0;
  display: block;
  &:hover {
    color: $link_color;
  }
`

const ItemLinkWrapper = styled.div`
  margin-top: 8px;
  display: block;
`

const ShortDesc = styled.div`
  margin-top: 8px;
  font-weight: 200;
  .md-RichEditor-editor .public-DraftEditor-content {
    min-height: 10px;
  }
  .md-RichEditor-root {
    padding: 0;
    figure.md-block-image {
      background: none;
    }
    figure.md-block-image figcaption .public-DraftStyleDefault-block {
      text-align: left;
    }
    .public-DraftEditor-content {
      padding: 0px 15px;
    }
  }
`

const PostContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: ${breakPoint.xl}) {
    margin: 0 5%;
  }
`

const NoData = styled.div`
  text-align: center;
  padding: 25px 0;
`
