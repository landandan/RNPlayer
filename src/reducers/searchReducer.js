/**
 * @flow
 */
import { combineReducers } from 'redux'

function searchHistory(state = [], action = {}) {
  if ( action.type === 'setSearchHistory' ) {
    return [...state, action.keywords]
  }
  return state
}

function searchResult(state = {}, action = {}) {
  if ( action.type === 'setSearchResult' ) {
    return {
      ...state,
      ...action.searchResult,
    }
  }
  return state
}

export default combineReducers({
  searchHistory,
  searchResult,
})