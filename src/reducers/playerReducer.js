/**
 * @flow
 */
import { combineReducers } from 'redux'

function musicList(state = {}, action = {}) {
  if (action.type === 'setPlayMusicList') {
    return [
      ...state,
      ...action.playMusicList,
    ]
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

function status(state = {
  paused: true,
  muted: false,
}, action = {}) {
  if (action.type === 'setPlayerStatus') {
    return {
      ...state,
      ...action.status,
    }
  }
  return state
}

export default combineReducers({
  musicList,
  currentMusicInfo,
  searchResultList,
  status,
})
