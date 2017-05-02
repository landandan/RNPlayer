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
  Title, Footer,
  Button, Left,
  Right, Body, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import Disc from '../component/player/Disc'
import VolumeModule from '../component/player/VolumeModule'
import PlayerControl from '../component/player/PlayerControl'
import ProgressBar from '../component/player/ProgressBar'
import { popRoute } from "../actions/routeAction";

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    playerVisible: boolean,
    onCancel: () => void,
  }

  render() {
    const { currentMusicInfo } = this.props.player
    return (
      <Modal transparent visible={this.props.playerVisible}
             animationType="fade" onRequestClose={this.props.onCancel}>
        <Container style={{backgroundColor: 'white'}}>
          <Header searchBar hasTabs>
            <Left>
              <Button
                transparent
                onPress={() => this.props.popRoute()}
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
          <View style={{flex: 1}}>
            <VolumeModule/>
            <Disc/>
            <ProgressBar
              currentValue={0}
            />
          </View>
          <Footer>
            <PlayerControl />
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
    popRoute: () => dispatch(popRoute()),
  }
}

export default connect(mapProps, mapAction)(MusicPlayer)