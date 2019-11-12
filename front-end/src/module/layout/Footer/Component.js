import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import { Col, Row, Avatar } from 'antd'
import I18N from '@/I18N'

import { CR_LINKS, ELASTOS_LINKS } from '@/constant'

import './style.scss'

export default class extends BaseComponent {
  ord_render() {
    return (
      <div className="c_Footer">
        <div className="horizGap" />
        <div className="footer-box">
          <Row className="d_rowFooter d_footerSection">
            <Col className="contact-container" xs={24} sm={24} md={7}>
              <div className="contact footer-vertical-section">
                <div className="title brand-color">
                  {I18N.get('landing.footer.contact')}
                </div>
                <div className="footer-color-dark">
                  {I18N.get('landing.cr')}
                  :
                  {' '}
                  <a href="mailto:cyberrepublic@elastos.org">cyberrepublic@elastos.org</a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
