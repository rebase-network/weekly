'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

export default class Demo extends React.Component {
  mdParser = null

  constructor(props) {
    super(props)
    this.mdParser = new MarkdownIt(/* Markdown-it options */)
  }

  handleEditorChange = ({html, text}) => {
    const { onChange, onTextChange } = this.props
    if (onChange) onChange(text)
    if (onTextChange) onTextChange({html, text})
  }

  render() {
    const { value = '' } = this.props
    return (
      <div style={{height: 500}}>
        <MdEditor
          value={value}
          renderHTML={(text) => this.mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      </div>
    )
  }
}
