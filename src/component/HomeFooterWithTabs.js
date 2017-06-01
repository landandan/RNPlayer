/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  FooterTab, Button, Text,
} from 'native-base'
import { connect } from 'react-redux'
import { setHomeFooterTabActive } from '../actions/homeAction'

class HomeFooterWithTabs extends Component {
  render() {
    const homeFooterTab = this.props.homeFooterTab
    return (
      <FooterTab>
        <Button
          onPress={() => this.props.setHomeFooterTabActive('推荐')}
          active={homeFooterTab.active === '推荐'}
        >
          <Text>推荐</Text>
        </Button>
        <Button
          onPress={() => this.props.setHomeFooterTabActive('歌单')}
          active={homeFooterTab.active === '歌单'}
        >
          <Text>歌单</Text>
        </Button>
        <Button
          onPress={() => this.props.setHomeFooterTabActive('段子')}
          active={homeFooterTab.active === '段子'}
        >
          <Text>段子</Text>
        </Button>
      </FooterTab>
    )
  }
}

function mapProps(store) {
  const { homeFooterTab = {} } = store.homePage || {}
  return {
    homeFooterTab,
  }
}

function mapActions(dispatch) {
  return {
    setHomeFooterTabActive: v => dispatch(setHomeFooterTabActive(v)),
  }
}

export default connect(mapProps, mapActions)(HomeFooterWithTabs)
