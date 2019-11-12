import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import user from './redux/user'
import post from './redux/post'
import language from './redux/language'

const default_state = {
  init: false,
}

const appReducer = (state = default_state) => {
  // switch (action.type) {}

  return state
}

export default combineReducers({
  app: appReducer,
  router: routerReducer,
  user: user.getReducer(),
  post: post.getReducer(),
  language: language.getReducer(),
})
