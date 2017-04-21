/**
 * @flow
 */
import { combineReducers } from 'redux'
import player from './playerReducer'
import homePage from './homeReducer'

const reducers = {
  player,
  homePage,
}
export default combineReducers(reducers)