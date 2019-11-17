import _ from 'lodash'
import { api_request } from '@/util'
import { logger } from '@/util'
import I18N from '@/I18N'
import { message } from 'antd'
import BaseService from '../model/BaseService'

export default class extends BaseService {
  constructor() {
    super()
    this.selfRedux = this.store.getRedux('post')
    this.prefixPath = '/api/post'
  }

  async changePage(page) {
    this.dispatch(this.selfRedux.actions.page_update(page))
  }

  async saveFilter(filter) {
    this.dispatch(this.selfRedux.actions.filter_update(filter))
  }

  async saveSortBy(sortBy) {
    this.dispatch(this.selfRedux.actions.sortBy_update(sortBy))
  }

  async loadMore(qry) {
    this.list(qry)
  }

  async list(qry) {
    this.dispatch(this.selfRedux.actions.loading_update(true))

    const path = `${this.prefixPath}/list`
    this.abortFetch(path)

    let result
    try {
      result = await api_request({
        path,
        method: 'get',
        data: qry,
        signal: this.getAbortSignal(path),
      })

      this.dispatch(this.selfRedux.actions.loading_update(false))
      this.dispatch(this.selfRedux.actions.all_posts_reset())
      this.dispatch(this.selfRedux.actions.all_posts_total_update(result.total))
      this.dispatch(this.selfRedux.actions.all_posts_update(_.values(result.list)))
    } catch (e) {
      logger.error(e)
    }

    return result
  }

  async myList(qry) {
    this.dispatch(this.selfRedux.actions.my_posts_loading_update(true))

    const path = `${this.prefixPath}/list`
    // this.abortFetch(path)

    let result
    try {
      result = await api_request({
        path,
        method: 'get',
        data: qry,
        signal: this.getAbortSignal(path),
      })

      this.dispatch(this.selfRedux.actions.my_posts_loading_update(false))
      this.dispatch(this.selfRedux.actions.my_posts_reset())
      // this.dispatch(this.selfRedux.actions.my_posts_total_update(result.total))
      this.dispatch(this.selfRedux.actions.my_posts_update(_.values(result.list)))
    } catch (e) {
      // Do nothing
    }

    return result
  }

  resetAll() {
    this.dispatch(this.selfRedux.actions.all_posts_reset())
  }

  resetMyList() {
    this.dispatch(this.selfRedux.actions.my_posts_reset())
  }

  resetDetail() {
    this.dispatch(this.selfRedux.actions.detail_reset())
  }

  async create(doc) {
    this.dispatch(this.selfRedux.actions.loading_update(true))

    const path = `${this.prefixPath}/create`
    let res
    try {

      res = await api_request({
        path,
        method: 'post',
        data: doc,
      })
    } catch (error) {
      this.dispatch(this.selfRedux.actions.loading_update(false))
      message.error('Error happened, please try again later or contact admin.')
      logger.error(error)
    }
    return res
  }

  async update(doc) {
    this.dispatch(this.selfRedux.actions.loading_update(true))

    const path = `${this.prefixPath}/${doc.id}/update`
    let res
    try {
      res = await api_request({
        path,
        method: 'put',
        data: doc,
      })
    } catch (error) {
      this.dispatch(this.selfRedux.actions.loading_update(false))
      message.error('Error happened, please try again later or contact admin.')
      logger.error(error)
    }
    return res
  }

  async addTag(doc) {
    this.dispatch(this.selfRedux.actions.loading_update(true))

    const path = `${this.prefixPath}/${doc.id}/addtag`
    let res
    try {
      res = await api_request({
        path,
        method: 'post',
        data: doc,
      })
    } catch (error) {
      this.dispatch(this.selfRedux.actions.loading_update(false))
      message.error('Error happened, please try again later or contact admin.')
      logger.error(error)
    }
    return res
  }

  async getDetail({ id, incViewsNum }) {
    this.dispatch(this.selfRedux.actions.loading_update(true))

    const path = `${this.prefixPath}/${id}/show`
    const result = await api_request({
      path,
      method: 'get',
      data: { incViewsNum },
    })

    this.dispatch(this.selfRedux.actions.loading_update(false))
    this.dispatch(this.selfRedux.actions.detail_update(result))

    return result
  }

  async like(id) {
    const path = `${this.prefixPath}/${id}/like`

    const res = await api_request({
      path,
      method: 'post',
    })

    return res
  }

}
