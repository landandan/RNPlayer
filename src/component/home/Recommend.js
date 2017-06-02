/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import HomeSwiper from '../HomeSwiper'
import SongList from '../SongList'

const { width } = Dimensions.get('window')

class Recommend extends Component {
  props: {
    banners: Array<Object>,
    hotspot: Array<Object>,
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: width * 200 / 540, width }}>
          <HomeSwiper banners={this.props.banners} />
        </View>
        <SongList songList={this.props.hotspot} navigation={this.props.navigation} />
      </View>
    )
  }
}

function mapProps(store) {
  const { NETSHomeData } = store.homePage || {}
  const { banners = [], hotspot = [] } = NETSHomeData || {}
  return {
    banners,
    hotspot,
  }
}

export default connect(mapProps)(Recommend)
