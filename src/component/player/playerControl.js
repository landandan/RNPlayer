/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Icon, Button,
} from 'native-base'
import MusicList from '../MusicList'

class PlayerControl extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  state: {
    visible: boolean,
  }

  props: {
    paused: boolean,
    pausedChange: () => void,
  }

  render() {
    return (
      <View
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity transparent style={{paddingHorizontal: 10}}>
          {/*repeat,shuffle,sync*/}
          <Icon name='repeat'/>
        </TouchableOpacity>
        <TouchableOpacity transparent style={{paddingHorizontal: 10}}>
          <Icon name='skip-backward'/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent style={{paddingHorizontal: 10}}
          onPress={this.props.pausedChange}
        >
          {/*pause:暂停,play：播放*/}
          <Icon name={this.props.paused? 'play': 'pause'}/>
        </TouchableOpacity>
        <TouchableOpacity transparent style={{paddingHorizontal: 10}}>
          <Icon name='skip-forward'/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{paddingHorizontal: 10}}
          transparent
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
      </View>
    )
  }
}

export default PlayerControl