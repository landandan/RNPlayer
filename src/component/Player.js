/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import { playMusicListNext, setCurrentMusicDuration, setMusicCurrentTime } from "../actions/playerAction";

class Player extends Component {
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
    //console.log('data:', data)
    this.props.setCurrentMusicDuration(data.duration)
  }

  onEnd(data) {
    //console.log('onEnd:', data)
    this.props.playMusicListNext()
  }
  onError(data) {
    //console.log('onError:', data)
    if(data.error){
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
    //console.log('onProgress:', data)
    this.props.setMusicCurrentTime(data.currentTime)
  }

  render() {
    const { muted, paused, volume } = this.props.status
    const { fileSrc = '' } = this.props.currentMusicInfo
    return (
      <Video
        source={{uri: (fileSrc || 'http://m2.music.126.net/7WiRhPdirEJ2axW9Xm6uJQ==/1415071481819545.mp3')}}
        //ref='video'
        muted={muted}
        volume={volume}
        paused={paused}
        onProgress={(e) => this.onProgress(e)}
        onLoad={(e) => this.onLoad(e)}
        onEnd={(e) => this.onEnd(e)}
        onError={(e) => this.onError(e)}
        //onBuffer={(e) => this.onBuffer(e)}
        //onLoadStart={(e) => this.onLoadStart(e)}
        //onTimedMetadata={(e) => this.onTimedMetadata(e)}
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
    setCurrentMusicDuration: (v) => dispatch(setCurrentMusicDuration(v)),
    setMusicCurrentTime: (v) => dispatch(setMusicCurrentTime(v)),
  }
}

export default connect(mapProps, mapAction)(Player)