/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  Icon,
} from 'native-base'
import { connect } from 'react-redux'
import { pausedChange, playMusicListNext, playMusicListPre } from "../actions/playerAction"

class PlayControlForHeader extends Component {
  render() {
    const { paused } = this.props.status
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/*<TouchableOpacity*/}
        {/*transparent*/}
        {/*onPress={this.props.playMusicListPre}*/}
        {/*style={{paddingHorizontal: 10}}>*/}
        {/*<Icon name='skip-backward'/>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          transparent style={{paddingHorizontal: 10}}
          onPress={this.props.pausedChange}
        >
          {/*pause:暂停,play：播放*/}
          <Icon name={paused? 'play': 'pause'} style={{color:'#007aff'}}/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={this.props.playMusicListNext}
          style={{paddingHorizontal: 10}}>
          <Icon name='skip-forward' style={{color:'#007aff'}}/>
        </TouchableOpacity>
        <Text>{this.props.currentMusicInfo.singer} - {this.props.currentMusicInfo.songName}</Text>
      </View>
    )
  }
}


function mapProps(store) {
  const { player } = store || {}
  const { status = {}, currentMusicInfo = {} } = player
  return {
    status,
    currentMusicInfo,
  }
}

function mapAction(dispatch) {
  return {
    pausedChange: () => dispatch(pausedChange()),
    playMusicListNext: () => dispatch(playMusicListNext()),
    //playMusicListPre: () => dispatch(playMusicListPre()),
  }
}

export default connect(mapProps, mapAction)(PlayControlForHeader)