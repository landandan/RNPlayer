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
  List, ListItem, Icon, Button,
} from 'native-base'
import { connect } from 'react-redux'
import Player from './Player'
import MusicList from './MusicList'
import MusicPlayer from '../pages/MusicPlayer'

class HomeFooter extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible: false,
      playerVisible: false,
      volume: 0.8,
      paused: true,
    }
  }
  state: {
    visible: boolean,
    playerVisible: boolean,
    volume: number,
    paused: boolean,
  }

  volumeChange(value: number){
    this.setState({
      volume: value,
    })
  }

  pausedChange(){
    this.setState({
      paused: !this.state.paused,
    })
  }

  render() {
    const { currentMusicInfo } = this.props.player
    return (
      <Container>
        <Content style={{backgroundColor: '#B72712'}}>
          <List>
            <ListItem style={{height: 55}}
                      onPress={() => { this.setState({
                        playerVisible: true,
                      }) }}>
              <Thumbnail square
                         style={{width: 48, height: 48,}}
                         source={{uri: currentMusicInfo.pic_small}}/>
              <Body>
              <Text>{currentMusicInfo.title}</Text>
              <Text note>Its time to build a difference . .</Text>
              </Body>
              <TouchableOpacity>
                <Thumbnail
                  style={{width: 30, height: 30, borderRadius: 15, marginRight: 8,}}
                  source={require('../images/play.png')}/>
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
                onCancel={() => {
                  this.setState({
                      visible: false,
                    })
              }}/>
              <Player
                volume={this.state.volume}
                paused={this.state.paused}
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
                paused={this.state.paused}
                pausedChange={() => this.pausedChange()}
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
  }
}

export default connect(mapProps, mapAction)(HomeFooter)