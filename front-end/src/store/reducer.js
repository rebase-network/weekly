import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import task from './redux/task'
import user from './redux/user'
import suggestion from './redux/suggestion'
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
  task: task.getReducer(),
  user: user.getReducer(),
  suggestion: suggestion.getReducer(),
  language: language.getReducer(),
})
