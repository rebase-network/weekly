import { ABSTRACT_MAX_WORDS } from '@/constant'

export default {
  title: {
    allPosts: 'All Posts',
    add: 'ADD A POST',
    edit: 'EDIT POST'
  },
  fields: {
    title: 'Title',
    content: 'Content',
  },
  status: {
    posted: 'Posted',
  },
  form: {
    search: 'Search Posts',
    button: {
      continue: 'Continue',
      cancel: 'Cancel',
      saveDraft: 'Save as Draft',
      save: 'Save & Post'
    },
    fields: {
      title: 'Title',
      desc: 'Content',
    },
    error: {
      required: 'This field is required',
      tooLong: 'This field is too long',
      [`limit${ABSTRACT_MAX_WORDS}`]: `You can only type ${ABSTRACT_MAX_WORDS} words max.`
    }
  },
  modal: {
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  header: {
    post: 'post',
  },
  search: {
    number: 'Number',
    title: 'Title',
    abstract: 'Abstract',
    email: 'Author email',
    name: 'Author name'
  },
  btnText: {
    edit: 'Edit',
    add: 'Add',
    generateImg: 'Generate Image',
  }
}
