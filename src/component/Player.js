/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Video from 'react-native-video'
import { playMusicListNext } from "../actions/playerAction";

class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: 0.0,
    }
  }

  props: {
    status: Object,
    currentMusicInfo: Object,
    playMusicListNext: () => void,
  }

  onLoad(data) {
    //console.log('data:', data)
    this.setState({
      duration: data.duration,
    })
  }

  onProgress = (data) => {
    let val = parseInt(data.currentTime)
    if ( val >= this.state.duration ) {
      this.props.playMusicListNext()
    }
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
  }
}

export default connect(mapProps, mapAction)(Player)