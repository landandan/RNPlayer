/**
 * @flow
 */
import { combineReducers } from 'redux'
import player from './playerReducer'
import homePage from './homeReducer'
import joke from './JokeReducer'

const reducers = {
  player,
  homePage,
  joke,
}
export default combineReducers(reducers)