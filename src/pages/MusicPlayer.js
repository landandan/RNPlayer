/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Modal,
  Slider,
} from 'react-native'
import {
  Container, Header,
  Title, Content, Footer,
  FooterTab, Button, Left,
  Right, Body, Icon, Drawer,
  Item, Input, Tabs, Tab, Text,
} from 'native-base'
import { connect } from 'react-redux'
import Disc from '../component/player/Disc'
import VolumeModule from '../component/player/VolumeModule'
import PlayerControlFooter from '../component/player/playerControl'

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    playerVisible: boolean,
    onCancel: () => void,
    volume: number,
    volumeChange: (v) => void,
    muted: boolean,
    mutedChange: () => void,
    paused: boolean,
    pausedChange: () => void,
  }

  render() {
    const { currentMusicInfo } = this.props.player
    return(
      <Modal transparent visible={this.props.playerVisible}
             animationType="fade" onRequestClose={this.props.onCancel}>
      <Container style={{backgroundColor: 'white'}}>
        <Header searchBar hasTabs>
          <Left>
            <Button
              transparent
              onPress={this.props.onCancel}
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
          <VolumeModule
            muted={this.props.muted}
            mutedChange={this.props.mutedChange}
            volume={this.props.volume}
            volumeChange={this.props.mutedChange}
          />
          <Disc/>
        </Content>
        <Footer>
          <PlayerControlFooter
            paused={this.props.paused}
            pausedChange={this.props.pausedChange}
          />
        </Footer>
      </Container>
      </Modal>
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