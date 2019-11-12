import React from 'react'
import _ from 'lodash'
import MediaQuery from 'react-responsive'
import ProfilePage from '@/module/page/ProfilePage'
import { Col, Row, Select, Button, Table } from 'antd'
import moment from 'moment/moment'
import I18N from '@/I18N'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import { MAX_WIDTH_MOBILE, MIN_WIDTH_PC } from '@/config/constant'

import './style.scss'

const FILTERS = {
  ALL: 'all',
  CREATED: 'createdBy',
  COMMENTED: 'commented',
  SUBSCRIBED: 'subscribed',
  ARCHIVED: 'archived'
}

const FILTERS_TEXT = {
  ALL: 'post.all',
  CREATED: 'post.addedByMe',
  COMMENTED: 'post.commentedByMe',
  SUBSCRIBED: 'post.subscribed',
  ARCHIVED: 'post.archived'
}

export default class extends ProfilePage {
  constructor(props) {
    super(props)

    this.state = {
      page: 1,
      results: 10,
      showMobile: false,
      filter: FILTERS.ALL
    }
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
    const actionsNode = this.renderHeaderActions()
    const listNode = this.renderList()
    const nav = (
      <Col sm={24} md={4} className="wrap-box-navigator">
        <Navigator selectedItem="profilePosts" />
      </Col>
    )
    const body = (
      <Col
        sm={24}
        md={20}
        className="c_ProfileContainer admin-right-column wrap-box-user"
      >
        {headerNode}
        {actionsNode}
        {listNode}
      </Col>
    )

    return (
      <div>
        <div className="p_ProfilePostList ebp-wrap">
          <Row>
            {nav}
            {body}
          </Row>
        </div>
      </div>
    )
  }

  renderHeader() {
    return (
      <h2 className="title komu-a cr-title-with-icon">
        {this.props.header || I18N.get('profile.post').toUpperCase()}
      </h2>
    )
  }

  renderColumns() {
    const columns = [
      {
        title: <span>#</span>,
        dataIndex: 'displayId',
        sorter: (a, b) => a.displayId - b.displayId,
        defaultSortOrder: 'descend'
      },
      {
        title: I18N.get('post.subject'),
        dataIndex: 'title',
        // width: '50%',
        className: 'fontWeight500 allow-wrap',
        render: (title, data) => (
          <a onClick={() => this.gotoDetail(data._id)} className="tableLink">
            {title}
          </a>
        )
      },
      {
        title: <span>{I18N.get('post.likes')}</span>,
        dataIndex: 'likesNum',
        sorter: (a, b) => a.likesNum - b.likesNum
      },
      {
        title: <span>{I18N.get('post.dislikes')}</span>,
        dataIndex: 'dislikesNum',
        sorter: (a, b) => a.dislikesNum - b.dislikesNum
      },
      {
        title: <span>{I18N.get('post.comments')}</span>,
        dataIndex: 'commentsNum',
        sorter: (a, b) => a.commentsNum - b.commentsNum
      },
      {
        title: <span>{I18N.get('post.activeness')}</span>,
        dataIndex: 'activeness',
        sorter: (a, b) => a.activeness - b.activeness
      },
      {
        title: <span>{I18N.get('post.created')}</span>,
        dataIndex: 'createdAt',
        render: createdAt => moment(createdAt).format('MMM D'),
        sorter: (a, b) => moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf()
      }
    ]
    return columns
  }

  // TODO
  renderHeaderActions() {
    return (
      <div className="header-actions-container">
        <MediaQuery maxWidth={MAX_WIDTH_MOBILE}>
          <Select
            name="type"
            onChange={this.onFilterChanged}
            value={this.state.filter}
          >
            {_.map(FILTERS, (filter, key) => (
              <Select.Option key={filter} value={filter}>
                {key}
              </Select.Option>
            ))}
          </Select>
        </MediaQuery>
        <MediaQuery minWidth={MIN_WIDTH_PC}>
          <Button.Group className="filter-group">
            {_.map(FILTERS, (value, key) => (
              <Button
                type="link"
                key={value}
                onClick={() => this.onFilterChanged(value)}
                className={
                  (this.state.filter === value && 'cr-strikethrough') || ''
                }
              >
                {I18N.get(FILTERS_TEXT[key])}
              </Button>
            ))}
          </Button.Group>
        </MediaQuery>
      </div>
    )
  }

  renderList() {
    const { dataList, loading, total } = this.props
    const columns = this.renderColumns()

    return (
      <Table
        columns={columns}
        rowKey={item => item._id}
        dataSource={dataList}
        loading={loading}
        onChange={this.onTableChanged}
        pagination={{
          current: this.state.page,
          pageSize: this.state.results,
          total: loading ? 0 : total,
          onChange: this.loadPage
        }}
      />
    )
  }

  onTableChanged = (pagination, filters, sorter) => {
    this.setState({
      filteredInfo: filters,
      pagination
    })
  }

  // TODO
  onSortByChanged = sortBy => this.setState({ sortBy }, this.refetch)

  onFilterChanged = filter => this.setState({ filter, page: 1 }, this.refetch)

  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const { currentUserId: profileListFor } = this.props
    const { filter, page, results } = this.state
    const query = {
      profileListFor,
      filter,
      page,
      results
    }
    // TODO
    if (this.state.sortBy) {
      query.sortBy = this.state.sortBy
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

  loadPage = async page => {
    const query = {
      ...this.getQuery(),
      page,
      results: this.state.results
    }

    this.setState({ loadingMore: true })

    try {
      await this.props.getList(query)
      this.setState({ page })
    } catch (e) {
      // Do not update page in state if the call fails
    }

    this.setState({ loadingMore: false })
  }

  gotoDetail(id) {
    this.props.history.push(`/posts/${id}`)
  }
}
