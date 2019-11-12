import { ABSTRACT_MAX_WORDS } from '@/constant'

export default {
  title: {
    allPosts: '所有文章',
    add: '添加新文章',
    edit: '编辑文章'
  },
  fields: {
    title: '标题',
    content: '内容',
  },
  status: {
    posted: '发布',
  },
  form: {
    search: '搜索文章',
    button: {
      continue: '继续',
      cancel: '取消',
      saveDraft: '保存草稿',
      save: '保存并发布'
    },
    fields: {
      title: '标题',
      desc: '内容',
    },
    error: {
      required: '必填项',
      tooLong: '文字太长',
      [`limit${ABSTRACT_MAX_WORDS}`]: `不能超过${ABSTRACT_MAX_WORDS}字`
    }
  },
  modal: {
    addTagComment: '添加评论',
    confirm: '确定',
    cancel: '取消',
  },
  header: {
    suggestion: '文章',
  },
  search: {
    number: '编号',
    title: '标题',
    abstract: '摘要',
    email: '作者邮箱',
    name: '作者姓名'
  },
  btnText: {
    edit: '编辑',
  }
}
