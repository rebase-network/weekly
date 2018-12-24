import React from 'react';
import BaseComponent from '@/model/BaseComponent';

import {Modal, Row, Col, Form} from 'antd';
import I18N from '@/I18N'
import './style.scss';

class C extends BaseComponent {

    ord_states() {
        return {
            visible: false
        }
    }

    async componentDidMount() {
        await this.props.getCurrentUser();
        this.updateModalVisibility();
    }

    updateModalVisibility() {
        const value = localStorage.getItem('popup-update')
        if (!value) {
            if (!this.props.is_login || !this.props.popup_update) {
                // User didn't see it yet
                this.setState({
                    visible: true
                })
            }
        }
    }

    ord_render() {
        return (
            <Modal
                visible={this.state.visible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
                width="76%"
                className = "c_Popup_Notif"
            >
                <Row>
                    <Col span={10}>
                        <div className="left-col-image">
                            <img src="/assets/images/login-left.png"/>
                        </div>
                    </Col>
                    <Col span={14}>
                        <div className="right-col">
                            <h1 className="komu-a title">{I18N.get('popup.changes.title')}</h1>
                            <ul className="synthese changes-list">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                                <li>Cras luctus tortor non ex scelerisque, vitae finibus tortor commodo.</li>
                                <li>
                                    Nam dapibus massa ultrices odio venenatis, non mollis tortor condimentum.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </li>
                                <li>Fusce vestibulum elit ac nisi laoreet condimentum.</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    }

    handleCancel() {
        if (this.props.is_login) {
            this.props.updateUserPopupUpdate(this.props.currentUserId)
            localStorage.setItem('popup-update', 'true')
        } else {
            localStorage.setItem('popup-update', 'true')
        }
        this.setState({
            visible: false
        })
    }
}

export default Form.create()(C)