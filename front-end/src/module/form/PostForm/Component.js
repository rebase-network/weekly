import React from 'react'
import _ from 'lodash'
import { Form, Input, Button, Row, Modal } from 'antd'
import htmlToImage from 'html-to-image'
import BaseComponent from '@/model/BaseComponent'
import I18N from '@/I18N'
import MDEditor from '@/module/common/MDEditor'

import { Container } from './style'

const FormItem = Form.Item


class C extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      errorKeys: {},
      imgGenerating: false,
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { onSubmit, form } = this.props
    this.setState({ loading: true })
    form.validateFields(async (err, values) => {
      if (err) {
        this.setState({
          loading: false,
          errorKeys: err,
          activeKey: this.getActiveKey(Object.keys(err)[0])
        })
        return
      }
      await onSubmit(values)
      this.setState({ loading: false })
    })
  }

  getTitleInput() {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    return getFieldDecorator('title', {
      rules: [
        { required: true, message: I18N.get('post.form.error.required') }
      ],
      initialValue: initialValues.title
    })(
      <Input size="large" type="text" />
    )
  }

  getTextarea(id) {
    const { initialValues = {} } = this.props
    const { getFieldDecorator } = this.props.form

    const rules = [{
      required: true,
      message: I18N.get('post.form.error.required')
    }]
    return getFieldDecorator(id, {
      rules,
      initialValue: initialValues[id],
    })(
      <MDEditor />
    )
  }

  ord_render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          {/* <FormItem
            label={`${I18N.get('post.form.fields.title')} *`}
            colon={false}
            >
            {this.getTitleInput()}
          </FormItem> */}
          <FormItem
            // label={`${I18N.get('post.form.fields.desc')} *`}
            colon={false}
          >
            {this.getTextarea('desc')}
          </FormItem>
          <Row gutter={8} type="flex" justify="center">
            <Button
              loading={this.state.loading}
              className="cr-btn cr-btn-primary"
              onClick={this.showModal}
            >
              {I18N.get('post.btnText.generateImg')}
            </Button>
            {/* <Button
              loading={this.state.loading}
              className="cr-btn cr-btn-primary"
              htmlType="submit"
            >
              {I18N.get('post.form.button.save')}
            </Button> */}
          </Row>
        </Form>
        {this.renderModal()}
      </Container>
    )
  }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = e => {
    this.generateImg()
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  };

  renderModal() {
    return (
      <div>
        <Modal
          title={I18N.get('post.btnText.generateImg')}
          onOk={this.handleOk}
          okText={I18N.get('post.btnText.generateImg')}
          okButtonProps={{ loading: this.state.imgGenerating }}
          onCancel={this.handleCancel}
          visible={this.state.visible}
          style={{ minWidth: 600, maxHeight: 600, overflow: 'scroll' }}
          bodyStyle={{ minHeight: 100 }}
        >
          <div>点击OK按钮可以生成图片，成功后可以点击右键下载</div>
          <div id="rendered-img">
            {this.state.img}
          </div>
        </Modal>
      </div>
    )
  }

  generateImg = async() => {
    const srcNode = document.getElementsByClassName('custom-html-style ')[0]
    const options = {
      // width: 420,
      style: {
      //   width: '420px',
      //   height: 'auto'
        fontSize: '20px'
      }
    }
    this.setState({ imgGenerating: true })
    try {
      const dataUrl = await htmlToImage.toPng(srcNode, options)
      const targetNode = document.getElementById('rendered-img')
      const img = new Image()
      img.src = dataUrl
      targetNode.innerHTML = null
      targetNode.appendChild(img)
      this.setState({ imgGenerating: false })
    } catch (error) {
      console.error('oops, something went wrong!', error)
    }
  }

}

export default Form.create()(C)
