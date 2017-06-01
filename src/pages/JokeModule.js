/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Platform,
  ActivityIndicator,
  ProgressBarAndroid,
  ActivityIndicatorIOS,
} from 'react-native'
import Joke from '../component/Joke'
import { connect } from 'react-redux'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
import { setJokeList } from '../actions/jokeAction'
import StyleSheet from '../utils/StyleSheet'

const styles = StyleSheet.create({
  pullDown: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})

class JokeModule extends Component {
  constructor() {
    super()
    this.state = {
      refreshNone: '刷新成功',
      joinData: [],
    }
  }

  state: {
    refreshNone: '刷新成功' | '刷新失败',
    joinData: Array<Object>,
  }

  pullToRefreshListView : {
    beginRefresh: () => void,
    endRefresh: () => void,
  }

  componentWillMount() {
    this.props.setJokeList()
    // this.pullToRefreshListView.beginRefresh()
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <PullToRefreshListView
          ref={(component) => {
            this.pullToRefreshListView = component
          }}
          contentContainerStyle={{ backgroundColor: 'transparent' }}
          renderHeader={this.renderHeader}
          onRefresh={this.onRefresh}
          // pullDownDistance={35}
          // pullDownStayDistance={50}
          enabledPullUp={false}
        >
          <Joke navigation={this.props.navigation} />
        </PullToRefreshListView>
      </View>
    )
  }
  renderActivityIndicator() {
    return ActivityIndicator ? (
      <ActivityIndicator
        style={{ marginRight: 10 }}
        animating
        size={'small'}
      />
      ) : Platform.OS === 'android' ?
        (
          <ProgressBarAndroid
            style={{ marginRight: 10 }}
            styleAttr={'Small'}
          />

        ) : (
          <ActivityIndicatorIOS
            style={{ marginRight: 10 }}
            animating
            size={'small'}
          />
        )
  }

  renderHeader = (viewState: any) => {
    const { pullState, pullDistancePercent } = viewState
    const {
      refresh_none,
      refresh_idle,
      will_refresh,
      refreshing,
    } = PullToRefreshListView.constants.viewState
    const percent = Math.round(pullDistancePercent * 100)
    switch (pullState) {
    case refresh_none:
      return (
        <View
          style={styles.pullDown}
        >
          <Text style={{ color: '#cccccc' }}>{this.state.refreshNone}</Text>
        </View>
      )
    case refresh_idle:
      return (
        <View
          style={styles.pullDown}
        >
          <Text style={{ color: '#cccccc' }}>下拉刷新 {percent}%</Text>
        </View>
      )
    case will_refresh:
      return (
        <View
          style={styles.pullDown}
        >
          <Text style={{ color: '#cccccc' }}>释放刷新</Text>
        </View>
      )
    case refreshing:
      return (
        <View
          style={[styles.pullDown, { flexDirection: 'row' }]}
        >
          {this.renderActivityIndicator()}<Text style={{ color: '#cccccc' }}>正在刷新</Text>
        </View>
      )
    default:

    }
  }

  onRefresh = async () => {
    this.props.setJokeList((item) => {
      if (item) {
        this.setState({
          refreshNone: '刷新成功',
        })
      } else {
        this.setState({
          refreshNone: '刷新失败',
        })
      }
      this.pullToRefreshListView.endRefresh()
    })
  }
}


function mapProps() {
  return {
  }
}

function mapAction(dispatch) {
  return {
    setJokeList: c => dispatch(setJokeList(c)),
  }
}

export default connect(mapProps, mapAction)(JokeModule)
