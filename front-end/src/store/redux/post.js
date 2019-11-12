import BaseRedux from '@/model/BaseRedux'

export const FETCH_POST_BEGIN = 'FETCH_POST_BEGIN'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'

class PostRedux extends BaseRedux {
  defineTypes() {
    return ['post']
  }

  defineDefaultState() {
    return {
      active_post: null,

      loading: false,

      create_form: {
      },

      all_posts: [],
      all_posts_total: 0,

      my_posts_loading: false,
      my_posts: [],
      my_posts_total: 0,
      page: 1,

      // if we select a detail
      detail: {},
      sortBy: null,
      filter: {},

      // filter on list
      tags_included: {
        infoNeeded: false,
        underConsideration: false
      },

      // filter on list - by default we don't show any posts added to proposals
      // TODO: this gets tricky because we can have a post referenced by multiple proposals
      // the proper handling is to only query the latest proposal and change this to struct to define which statuses we want
      // for now I will just use a boolean to mean any proposal referencing it with any status
      reference_status: false,
      edit_history: [],
    }
  }
}

export default new PostRedux()
