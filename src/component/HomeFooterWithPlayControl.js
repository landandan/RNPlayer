/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {
  Body,
  Thumbnail,
  Container, Content,
  List, ListItem, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import MusicList from './MusicList'
import MusicPlayer from '../pages/MusicPlayer'
import { playMusicList, pausedChange } from "../actions/playerAction";

class HomeFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  state: {
    visible: boolean,
  }

  render() {
    const { currentMusicInfo = {
      name: '',
      album: {
        picUrl: ''
      },
      artists: [{name: ''}],
    }, status } = this.props.player
    const navigation = this.props.navigation
    return (
      <Container>
        <Content style={{backgroundColor: '#B72712'}}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('MusicPlayer')}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row', alignItems: 'center', height: 55, marginHorizontal: 5}}>
              <Thumbnail square
                         style={{width: 48, height: 48}}
                         source={{uri: currentMusicInfo.album.picUrl}}/>
              <View style={{marginLeft: 5, flex: 1}}>
                <Text>{currentMusicInfo.artists[0].name}</Text>
                <Text
                  style={{fontSize: 13, color: 'white', paddingTop: 5}}>{currentMusicInfo.name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{width: 30, height: 30, borderRadius: 15, marginRight: 8,}}
                  onPress={this.props.pausedChange}
                >
                  <Icon name={status.paused? 'play': 'pause'}/>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginRight: 10}}
                  onPress={() => {
                  this.setState({
                    visible: !this.state.visible,
                  })
                }}>
                  <Icon name='list'/>
                </TouchableOpacity>
              </View>
              <MusicList
                visible={this.state.visible}
                onCancel={() => {
                  this.setState({
                      visible: false,
                    })
              }}/>
            </View>
          </TouchableWithoutFeedback>
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
    pausedChange: () => dispatch(pausedChange()),
    playMusicList: (v) => dispatch(playMusicList(v)),
  }
}

export default connect(mapProps, mapAction)(HomeFooter)