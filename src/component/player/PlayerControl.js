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
import StyleSheet from '../../utils/StyleSheet'
import { playMusicListNext, playMusicListPre, pausedChange } from '../../actions/playerAction'

const styles = StyleSheet.create({
  circle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    overflow: 'hidden',
  }
})

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
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <TouchableOpacity transparent style={{ paddingHorizontal: 10 }}>
          {/* repeat,shuffle,sync*/}
          <Icon name="repeat" />
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={this.props.playMusicListPre}
          style={styles.circle}
        >
          <Icon name="skip-backward" style={{fontSize: 18, paddingTop: 2}}/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent style={[styles.circle,{ width: 40, height: 40, borderRadius: 20}]}
          onPress={this.props.pausedChange}
        >
          {/* pause:暂停,play：播放*/}
          <Icon name={paused ? 'play' : 'pause'} style={{paddingLeft: 4, paddingTop: 2}}/>
        </TouchableOpacity>
        <TouchableOpacity
          transparent
          onPress={this.props.playMusicListNext}
          style={styles.circle}
        >
          <Icon name="skip-forward" style={{fontSize: 18, paddingTop: 2}}/>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingHorizontal: 10 }}
          transparent
          onPress={() => {
            this.setState({
              visible: !this.state.visible,
            })
          }}
        >
          <Icon name="list" />
        </TouchableOpacity>
        <MusicList
          visible={this.state.visible}
          onCancel={() => {
            this.setState({
              visible: false,
            })
          }}
        />
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
