/**
 * @flow
 */

import { combineReducers } from 'redux'

function jokeList(state = {}, action = {}) {
  if (action.type === 'setJokeList') {
    return {
      ...state,
      ...action.jokeList,
    }
  }
  return state
}

function jokeInfo(state = {minBeHotTime: ''}, action = {}) {
  if (action.type === 'setJokeInfo') {
    return {
      ...state,
      ...action.jokeInfo,
    }
  }
  return state
}

export default combineReducers({
  jokeList,
  jokeInfo,
})