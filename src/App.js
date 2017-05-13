/**
 * @flow
 */
import React, { Component } from 'react'
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import devTools from 'remote-redux-devtools'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Platform, AsyncStorage, View } from 'react-native'
import reducers from './reducers'
import createStoreWithMiddleware from "./utils/middleware"
import { AppNavigator } from './utils/AppNavigator'
import Loading from './component/loading'

const devEnhancer = devTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678,
})
const productionEnhancer = compose(createStoreWithMiddleware, autoRehydrate())
const fn='__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'
let devMac= window[fn] ? window[fn]():devEnhancer
const enhancer = compose(productionEnhancer, devMac)
const store = createStore(
  reducers,
  undefined,
  enhancer,
);
const persistor = persistStore(store, {
  storage: AsyncStorage,
  blacklist: ['loading'],
})
global.ErrorUtils.setGlobalHandler((err) => {
  persistor.purge()
  throw err
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <AppNavigator />
          <Loading />
        </View>
      </Provider>
    )
  }
}

export default App