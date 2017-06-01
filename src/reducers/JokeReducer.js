/**
 * @flow
 */

import { combineReducers } from 'redux'

function jokeList(state = {}, action = {}) {
  if (action.type === 'setJokeList') {
    return {
      ...state,
      ...action.jokeList,
      //data: [...action.jokeList.data, ...state.data],
    }
  }
  return state
}

function jokeInfo(state = { minBeHotTime: '' }, action = {}) {
  if (action.type === 'setJokeInfo') {
    return {
      ...state,
      ...action.jokeInfo,
    }
  }
  return state
}

function group(state = {}, action = {}) {
  if (action.type === 'setCurrentJokeDetailsGroup') {
    return {
      ...state,
      ...action.group,
    }
  }
  return state
}

function comments(state = {}, action = {}) {
  if (action.type === 'setCurrentJokeDetailsComments') {
    return {
      ...state,
      ...action.comments,
    }
  }
  return state
}

const currentJokeDetails = combineReducers({
  group,
  comments,
})

export default combineReducers({
  jokeList,
  jokeInfo,
  currentJokeDetails,
})
