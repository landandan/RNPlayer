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
  Button, Left,
  Right, Body, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import Disc from '../component/player/Disc'
import VolumeModule from '../component/player/VolumeModule'
import PlayerControl from '../component/player/PlayerControl'
import ProgressBar from '../component/player/ProgressBar'

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    playerVisible: boolean,
    onCancel: () => void,
    musicData: Array<Object>,
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
          <Title>{currentMusicInfo.songName || '未知'} - {currentMusicInfo.singer || '佚名'}</Title>
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
          <VolumeModule/>
          <Disc/>
          <ProgressBar
            currentValue={0}
          />
        </Content>
        <Footer>
          <PlayerControl
            musicData={this.props.musicData}
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