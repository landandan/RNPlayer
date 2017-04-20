/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container, Header,
  Title, Content, Footer,
  FooterTab, Button, Left,
  Right, Body, Icon, Drawer,
  Item, Input, Tabs, Tab, Text,
} from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Disc from '../component/player/Disc'
import PlayerControlFooter from '../component/player/playerControl'

class MusicPlayer extends Component {
  render() {
    const { currentMusicInfo } = this.props.player
    return(
      <Container>
        <Header searchBar hasTabs>
          <Left>
            <Button
              transparent
              onPress={() =>{
                      Actions.pop()
                    } }
            >
              <Icon name='arrow-round-back'/>
            </Button>
          </Left>
          <Body>
          <Title>{currentMusicInfo.title}</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>{
                      alert('提示','该功能正在开发中！')
                    } }
            >
              <Icon name='share'/>
            </Button>
          </Right>
        </Header>
        <Content>
          <Disc/>
        </Content>
        <Footer>
          <PlayerControlFooter/>
        </Footer>
      </Container>
    )
  }
}

function mapProps(store) {
  const { player } = store || {}
  return {
    player,
  }
}

function mapAction(dispatch) {
  return {
  }
}

export default connect(mapProps, mapAction)(MusicPlayer)