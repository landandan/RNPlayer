/**
 * @flow
 */
import { combineReducers } from 'redux'
import player from './playerReducer'
import homePage from './homeReducer'
import joke from './JokeReducer'
import route from './route'

const reducers = {
  player,
  homePage,
  joke,
  //route,
}
export default combineReducers(reducers)