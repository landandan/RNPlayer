/**
 * @flow
 */
import { combineReducers } from 'redux'
import player from './playerReducer'
import homePage from './homeReducer'
import joke from './JokeReducer'
import loading from "./loadingReducer"
import searchPage from './searchReducer'
import route from './routeReducer'

const reducers = {
  loading,
  homePage,
  player,
  joke,
  //route,
  searchPage,
}
export default combineReducers(reducers)