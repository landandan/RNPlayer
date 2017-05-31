/**
 * @flow
 */
import { combineReducers } from 'redux'
function MusicListData(state = {},action = {}) {
  if(action.type === 'page/getMusicListData') {
    return {
      ...state,
      ...action.musicListData
    }
  }
  return state
}

export default MusicListData