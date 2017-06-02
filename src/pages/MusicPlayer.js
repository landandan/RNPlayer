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
import VolumeModule from '../component/player/VolumeModule'
import PlayerControl from '../component/player/PlayerControl'
import ProgressBar from '../component/player/ProgressBar'
import Lyric from '../component/player/Lyric'

class MusicPlayer extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    playerVisible: boolean,
    onCancel: () => void,
    navigation: Object,
  }

  render() {
    const { currentMusicInfo } = this.props.player
    const navigation = this.props.navigation
    return (
      <Modal
        transparent visible={this.props.playerVisible}
        animationType="fade" onRequestClose={this.props.onCancel}
      >
        <Container style={{ backgroundColor: 'white' }}>
          <Header searchBar hasTabs>
            <Left>
              <Button
                transparent
                onPress={() => navigation.goBack(null)}
              >
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{currentMusicInfo.name || '未知'} - {currentMusicInfo.artists[0].name || '佚名'}</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                  alert('提示', '该功能正在开发中！')
                }}
              >
                <Icon name="share" />
              </Button>
            </Right>
          </Header>
          <View style={{ flex: 1 }}>
            <VolumeModule />
            <Lyric />
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

export default connect(mapProps)(MusicPlayer)
