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
import PlayerControlFooter from '../component/player/PlayerControl'
import ProgressBar from '../component/player/ProgressBar'
import { playMusicList } from "../actions/playerAction";

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
    musicData: Array<Object>,
    playMusicList: (v) => void,
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
            volumeChange={this.props.volumeChange}
          />
          <Disc/>
          <ProgressBar
            currentValue={0}
          />
        </Content>
        <Footer>
          <PlayerControlFooter
            musicData={this.props.musicData}
            paused={this.props.paused}
            playMusicList={(v) => this.props.playMusicList(v)}
            currentMusicInfo={currentMusicInfo}
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
    playMusicList: (v) => dispatch(playMusicList(v))
  }
}

export default connect(mapProps, mapAction)(MusicPlayer)