import React from 'react'
import _ from 'lodash'
import { Spin } from 'antd'
import I18N from '@/I18N'
import BaseComponent from '@/model/BaseComponent'
import MetaContainer from '../common/meta/Container'
import { getSafeUrl } from '@/util/url'

import './style.scss'

export default class extends BaseComponent {
  constructor(props) {
    super(props)

    // we use the props from the redux store if its retained
    this.state = {
      showMobile: false,
      page: 1,
      results: 5,
      total: 0,
    }
  }

  componentDidMount() {
    this.refetch()
  }

  componentWillUnmount() {
    this.props.resetAll()
  }

  ord_render() {
    const { dataList, loading, currentUserId } = this.props
    const loadingNode = <div className="center"><Spin size="large" /></div>
    let listNode = loading ? loadingNode : this.renderList()

    if (_.isEmpty(dataList) && !loading || !currentUserId) {
      listNode = <div className="center">{I18N.get('post.nodata')}</div>
    }

    const headerNode = this.renderHeader()
    return (
      <div className="p_MyPostList">
        {headerNode}
        {listNode}
      </div>
    )
  }

  renderHeader() {
    return (
      <div className="cr-mypost-header">
        <h2 className="title komu-a">{this.props.header || I18N.get('post.myPosts').toUpperCase()}</h2>
        <a href="/profile/post" className="view-all-link">{I18N.get('post.viewAll')}</a>
      </div>
    )
  }

  renderList() {
    const { dataList } = this.props
    const result = _.map(dataList, data => this.renderItem(data))
    return <div className="list-container">{result}</div>
  }

  renderItem = (data) => {
    const metaNode = this.renderMetaNode(data)
    const href = `/post/${data._id}`
    const title = <a href={getSafeUrl(href)} className="title-link">{data.title}</a>
    return (
      <div key={data._id} className="item-container">
        {metaNode}
        {title}
      </div>
    )
  }

  renderMetaNode = data => <MetaContainer data={data} hideAuthor={true} />

  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const { page, results } = this.state
    const query = {
      page,
      results,
      createdBy: this.props.currentUserId,
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

  goToProfile = () => {
    this.props.history.push('/profile/post')
  }
}
