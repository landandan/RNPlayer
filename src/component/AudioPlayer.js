/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import { Toast } from 'native-base'
import { playMusicListNext, setCurrentMusicDuration, setMusicCurrentTime } from '../actions/playerAction'

class AudioPlayer extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    status: Object,
    currentMusicInfo: Object,
    playMusicListNext: () => void,
    setCurrentMusicDuration: (v) => void,
    setMusicCurrentTime: (v) => void,
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
    if (data.error) {
      Toast.show({
        text: '无法连接服务器,自动播放下一首',
        position: 'bottom',
        duration: 3000,
        type: 'warning',
      })
      this.props.playMusicListNext()
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
    const { muted, paused, volume } = this.props.status
    const { mp3Url = '' } = this.props.currentMusicInfo
    return (
      <Video
        source={{ uri: mp3Url }}
        // ref='video'
        muted={muted}
        volume={volume}
        paused={paused}
        onProgress={e => this.onProgress(e)}
        onLoad={e => this.onLoad(e)}
        onEnd={e => this.onEnd(e)}
        onError={e => this.onError(e)}
        playInBackground
      />
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
