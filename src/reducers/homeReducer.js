/**
 * @flow
 */
import { combineReducers } from 'redux'

function NETSHomeData(state = {}, action = {}) {
  if (action.type === 'setNETSHomeData') {
    return {
      ...state,
      ...action.NETSHomeData
    }
  }
  return state
}

export default combineReducers({
  NETSHomeData,
})