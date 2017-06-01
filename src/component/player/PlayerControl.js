/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Icon,
} from 'native-base'
import { connect } from 'react-redux'
import MusicList from '../MusicList'
import { playMusicListNext, playMusicListPre, pausedChange } from "../../actions/playerAction"

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
    pausedChange: () => void,
    playMusicListPre: () => void,
    playMusicListNext: () => void,
  }

  render() {
    const { paused } = this.props.status
    return (
      <View
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <TouchableOpacity transparent style={{paddingHorizontal: 10}}>
          {/*repeat,shuffle,sync*/}
          <Icon name='repeat'/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={this.props.playMusicListPre}
          style={{paddingHorizontal: 10}}>
          <Icon name='skip-backward'/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent style={{paddingHorizontal: 10}}
          onPress={this.props.pausedChange}
        >
          {/*pause:暂停,play：播放*/}
          <Icon name={paused? 'play': 'pause'}/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={this.props.playMusicListNext}
          style={{paddingHorizontal: 10}}>
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
          <Icon name='list'/>
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

function mapProps(store) {
  const { player } = store || {}
  const { status = {} } = player
  return {
    status,
  }
}

function mapAction(dispatch) {
  return {
    pausedChange: () => dispatch(pausedChange()),
    playMusicListNext: () => dispatch(playMusicListNext()),
    playMusicListPre: () => dispatch(playMusicListPre()),
  }
}

export default connect(mapProps, mapAction)(PlayerControl)