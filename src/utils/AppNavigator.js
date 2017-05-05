/**
 * @flow
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
  TabRouter,
  createNavigator,
  createNavigationContainer,
} from 'react-navigation';

import HomePage from "../pages/HomePage"
import SearchPage from "../pages/SearchPage"
import MusicPlayer from '../pages/MusicPlayer'
import RecommendModule from '../pages/RecommendModule'
import MusicListModule from '../pages/MusicListModule'
import JokeModule from '../pages/JokeModule'

const CustomTabRouter = TabRouter({
  Recommend: {
    screen: RecommendModule,
    path: 'recommend',
  },
  MusicList: {
    screen: MusicListModule,
    path: 'musicList',
  },
  Joke: {
    screen: JokeModule,
    path: 'joke',
  },
}, {
  // Change this to start on a different tab
  initialRouteName: 'Recommend',
});

const CustomTabs = createNavigationContainer(createNavigator(CustomTabRouter)(HomePage));

export const AppNavigator = StackNavigator({
  Root: {
    screen: CustomTabs,
  },
  MusicPlayer: { screen: MusicPlayer },
  Search: { screen: SearchPage },
}, {
  //initialRouteName: 'Root', // 默认显示界面
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

//export default connect(mapProps)(AppWithNavigationState)