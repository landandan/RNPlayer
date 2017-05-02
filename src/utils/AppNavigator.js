/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import HomePage from "../pages/HomePage"
import SearchPage from "../pages/SearchPage"
import MusicPlayer from '../pages/MusicPlayer'

export const AppNavigator = StackNavigator({
  Home: { screen: HomePage },
  MusicPlayer: { screen: MusicPlayer },
  Search: { screen: SearchPage },
}, {
  initialRouteName: 'Home', // 默认显示界面
  mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
  headerMode: 'none',
});

class AppWithNavigationState extends Component{
  props: {
    dispatch: any,
    route: Object,
  }
  render() {
    const dispatch = this.props.dispatch
    const route = this.props.route
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: route })}/>
    )
  }
}

function mapProps(store) {
  const { route } = store || {}
  return {
    route,
  }
}

export default connect(mapProps)(AppWithNavigationState)