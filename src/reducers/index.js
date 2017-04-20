/**
 * @flow
 */
import { combineReducers } from 'redux'
import player from './playerReducer'

const reducers = {
  player,
}
export default combineReducers(reducers)