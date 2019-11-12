import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Helmet } from 'react-helmet'

export default class extends BaseComponent {
  ord_render() {
    const { desc, title, url } = this.props

    let host = 'https://weekly.org'
    switch (process.env.NODE_ENV) {
      case 'development':
        host = 'http://localhost:3001'
        break
      case 'staging':
        host = 'https://staging.weekly.org'
        break
      default:
        break
    }

    const slogan =
      'Weekly is a tool to manage knowledge for your community'

    const description = desc || slogan

    const meta = [
      {
        name: 'description',
        content: description
      },
      {
        property: 'og:title',
        content: title || 'Weekly'
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: 'https://www.weekly.org/assets/images/cr_landing.png'
      },
      { property: 'og:url', content: url ? `${host}${url}` : host },
      { property: 'og:site_name', content: 'Weekly' },
      { property: 'twitter:image:alt', content: 'Weekly Logo' },
      { name: 'twitter:card', content: description }
    ]

    return <Helmet title={title} meta={meta} />
  }
}
