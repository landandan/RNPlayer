/**
 * @flow
 */
import { combineReducers } from 'redux'

function musicList(state = {}, action = {}) {
  if (action.type === 'setMusicList') {
    return {
      ...state,
      ...action.musicList,
    }
  }
  return state
}

function currentMusicInfo(state = {}, action = {}) {
  if (action.type === 'setCurrentMusicInfo') {
    return {
      ...state,
      ...action.musicInfo,
    }
  }
  return state
}

function searchResultList(state = {}, action = {}) {
  if (action.type === 'setSearchResultList') {
    return {
      ...state,
      ...action.searchResultList,
    }
  }
  return state
}

export default combineReducers({
  musicList,
  currentMusicInfo,
  searchResultList,
})
