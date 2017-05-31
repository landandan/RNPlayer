/**
 * @flow
 */
import { combineReducers } from 'redux'

function MusicListType(state = '',action = {}) {
  if(action.type === 'page/setCurrentMusicListType') {
    return action.musicListType
  }
  return state
}

function MusicListData(state = {},action = {}) {
  if(action.type === 'page/getMusicListData') {
    return {
      ...state,
      ...action.musicListData
    }
  }
  return state
}

export default combineReducers({
  MusicListType,
  MusicListData,
})