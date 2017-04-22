/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Body,
  Text,
  Thumbnail,
  Container, Content,
  List, ListItem, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import Player from './Player'
import MusicList from './MusicList'
import MusicPlayer from '../pages/MusicPlayer'
import { setPlayerStatus, playMusicList } from "../actions/playerAction";

class HomeFooter extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      playerVisible: false,
      volume: 0.8,
    }
  }
  state: {
    visible: boolean,
    playerVisible: boolean,
    volume: number,
  }

  volumeChange(value: number){
    this.setState({
      volume: value,
    })
  }

  pausedChange(){
    const { status } = this.props.player
    this.props.setPlayerStatus({
      paused: !status.paused,
    })
  }

  mutedChange(){
    const { status } = this.props.player
    this.props.setPlayerStatus({
      muted: !status.muted,
    })
  }

  render() {
    const { currentMusicInfo, status } = this.props.player
    return (
      <Container>
        <Content style={{backgroundColor: '#B72712'}}>
          <List>
            <ListItem style={{height: 55}}
                      onPress={() => {
                        this.setState({
                        playerVisible: true,
                      }) }}>
              <Thumbnail square
                         style={{width: 48, height: 48,}}
                         source={{uri: currentMusicInfo.imgSrc}}/>
              <Body>
                <Text>{currentMusicInfo.singer}</Text>
                <Text note>{currentMusicInfo.songName}</Text>
              </Body>
              <TouchableOpacity
                style={{width: 30, height: 30, borderRadius: 15, marginRight: 8,}}
                onPress={() => this.pausedChange()}
              >
                <Icon name={status.paused? 'play': 'pause'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    visible: !this.state.visible,
                  })
                }}>
                <Icon name='menu'/>
              </TouchableOpacity>
              <MusicList
                visible={this.state.visible}
                musicData={this.props.musicData}
                currentMusicInfo={currentMusicInfo}
                playMusicList={(v) => this.props.playMusicList(v)}
                onCancel={() => {
                  this.setState({
                      visible: false,
                    })
              }}/>
              <Player
                fileSrc={currentMusicInfo.fileSrc}
                volume={this.state.volume}
                paused={status.paused}
                muted={status.muted}
              />
              <MusicPlayer
                playerVisible={this.state.playerVisible}
                onCancel={() => {
                  this.setState({
                      playerVisible: false,
                    })
                  }}
                volume={this.state.volume}
                volumeChange={
                  (value) => this.volumeChange(value)
                }
                paused={status.paused}
                pausedChange={() => this.pausedChange()}
                muted={status.muted}
                mutedChange={() => this.mutedChange()}
                musicData={this.props.musicData}
              />
            </ListItem>
          </List>
        </Content>
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
    setPlayerStatus: (v) => dispatch(setPlayerStatus(v)),
    playMusicList: (v) => dispatch(playMusicList(v)),
  }
}

export default connect(mapProps, mapAction)(HomeFooter)