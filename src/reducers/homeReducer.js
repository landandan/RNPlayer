/**
 * @flow
 */
import { combineReducers } from 'redux'

function NETSHomeData(state = {}, action = {}) {
  if (action.type === 'setNETSHomeData') {
    return {
      ...state,
      ...action.NETSHomeData,
    }
  }
  return state
}

function homeFooterTab(state = {
  active: '推荐',
}, action = {}) {
  if (action.type === 'setHomeFooterTabActive') {
    return {
      ...state,
      active: action.active,
    }
  }
  return state
}

export default combineReducers({
  NETSHomeData,
  homeFooterTab,
})
