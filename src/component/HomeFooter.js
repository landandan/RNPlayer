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
import { Actions } from 'react-native-router-flux'
import MusicList from './MusicList'

class HomeFooter extends Component {
  constructor(){
    super()
    this.state = {
      visible: false,
    }
  }
  state: {
    visible: boolean,
  }
  render() {
    const { currentMusicInfo } = this.props.player
    return (
      <Container>
        <Content style={{backgroundColor: '#B72712'}}>
          <List>
            <ListItem style={{height: 55}} onPress={() => { Actions.musicPlayer() }}>
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