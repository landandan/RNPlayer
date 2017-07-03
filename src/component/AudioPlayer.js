/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import _ from 'lodash'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import { Toast } from 'native-base'
import {
  playMusicListNext,
  setCurrentMusicDuration,
  setMusicCurrentTime
} from '../actions/playerAction'
import { getMusicUrlById } from "../utils/API/NeteaseCloudMusicApi/fetchNeteaseNode"

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
    }
  }

  props: {
    status: Object,
    currentMusicInfo: Object,
    playMusicListNext: () => void,
    setCurrentMusicDuration: () => void,
    setMusicCurrentTime: () => void,
  }

  async componentWillReceiveProps(nextProps: Object) {
    if (nextProps.currentMusicInfo.id != this.props.currentMusicInfo.id) {
      const { id = '' } = nextProps.currentMusicInfo
      const musicUrlResult = await getMusicUrlById(id)
      const musicUrl = _.find(musicUrlResult.data, { id, })
      this.setState({
        url: musicUrl.url
      })
    }
  }

  onLoad(data) {
    // console.log('data:', data)
    this.props.setCurrentMusicDuration(data.duration)
  }

  onEnd(data) {
    // console.log('onEnd:', data)
    this.props.playMusicListNext()
  }

  onError(data) {
    // console.log('onError:', data)
    if ( data.error ) {
      Toast.show({
        text: '无法连接服务器,自动播放下一首',
        position: 'bottom',
        duration: 3000,
        type: 'warning',
      })
      if ( !this.props.status.paused ) {
        this.props.playMusicListNext()
      }
    }
  }

  onBuffer(data) {
    console.log('onBuffer:', data)
  }

  onLoadStart(data) {
    console.log('onLoadStart:', data)
  }

  onTimedMetadata(data) {
    console.log('onTimedMetadata:', data)
  }

  onProgress = (data) => {
    // console.log('onProgress:', data)
    this.props.setMusicCurrentTime(data.currentTime)
  }

  render() {
    const { muted, paused, volume, cyclicalPattern } = this.props.status
    return (
      <View>
        {
          !_.isEmpty(this.state.url) && <Video
            source={{ uri: this.state.url }}
            // ref='video'
            muted={muted}
            volume={volume}
            paused={paused}
            repeat={cyclicalPattern == 'repeat'}
            onProgress={e => this.onProgress(e)}
            onLoad={e => this.onLoad(e)}
            onEnd={e => this.onEnd(e)}
            onError={e => this.onError(e)}
            playInBackground
          />
        }
      </View>
    )
  }
}
function mapProps(store) {
  const { player } = store || {}
  const { currentMusicInfo = {}, status = {} } = player
  return {
    currentMusicInfo,
    status,
  }
}

function mapAction(dispatch) {
  return {
    playMusicListNext: () => dispatch(playMusicListNext()),
    setCurrentMusicDuration: v => dispatch(setCurrentMusicDuration(v)),
    setMusicCurrentTime: v => dispatch(setMusicCurrentTime(v)),
  }
}

export default connect(mapProps, mapAction)(AudioPlayer)
