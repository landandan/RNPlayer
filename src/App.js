/**
 * @flow
 */
import React, { Component } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { multiDispatcher } from "./utils/middleware"
import { AppNavigator } from './utils/AppNavigator'

const createStoreWithMiddleware = applyMiddleware(multiDispatcher, thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

export default App