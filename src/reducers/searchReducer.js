/**
 * @flow
 */
import { combineReducers } from 'redux'
import { reset } from '../utils/Common'

function searchHistory(state = [], action = {}) {
  if (action.type === 'setSearchHistory') {
    return [...state, action.keywords]
  }
  return state
}

const searchResult = reset('searchResult/reset')((state = {}, action = {}) => {
  if (action.type === 'setSearchResult') {
    return {
      ...state,
      ...action.searchResult,
    }
  }
  return state
})

export default combineReducers({
  searchHistory,
  searchResult,
})
