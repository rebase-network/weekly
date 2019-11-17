import React from 'react'
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import tasklists from 'markdown-it-task-lists'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import { MOCK_DATA } from '@/constants/markdown'

export default class Demo extends React.Component {
  mdEditor = null

  mdParser = null

  constructor(props) {
    super(props)
    // initial a parser
    this.mdParser = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (__) {}
        }
        return '' // use external default escaping
      }
    })
    .use(emoji)
    .use(subscript)
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(tasklists, { enabled: this.taskLists })
  }

  handleEditorChange = ({html, text}) => {
    const { onChange, onTextChange } = this.props
    if (onChange) onChange(text)
    if (onTextChange) onTextChange({html, text})
  }

  handleImageUpload(file, callback) {
    const reader = new FileReader()
    reader.onload = () => {
      const convertBase64UrlToBlob = (urlData) => {
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
      }
      const blob = convertBase64UrlToBlob(reader.result)
      setTimeout(() => {
        // setTimeout 模拟异步上传图片
        // 当异步上传获取图片地址后，执行calback回调（参数为imageUrl字符串），即可将图片地址写入markdown
        callback(reader.result)
      }, 1000)
    }
    reader.readAsDataURL(file)
  }


  render() {
    const { value = MOCK_DATA } = this.props
    return (
      <div style={{height: 500}}>
        <MdEditor
          hidePreview={true}
          hideToggle={true}
          value={value}
          renderHTML={(text) => this.mdParser.render(text)}
          ref={node => this.mdEditor = node}
          // style={{height: '400px'}}
          config={{
            view: {
              menu: true,
              md: true,
              html: true,
            },
            // imageUrl: 'https://octodex.github.com/images/minion.png'
          }}
          onChange={this.handleEditorChange}
          // onImageUpload={this.handleImageUpload}
      />
      </div>
    )
  }
}
