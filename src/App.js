/**
 * @flow
 */
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Scene, Router, Actions } from 'react-native-router-flux'
import reducers from './reducers'
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import MusicPlayer from './pages/MusicPlayer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={HomePage} initial={true}/>
    <Scene key="searchPage" component={SearchPage}/>
    <Scene key="musicPlayer" component={MusicPlayer}/>
  </Scene>
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router scenes={scenes} hideNavBar="true"/>
      </Provider>
    )
  }
}

export default App