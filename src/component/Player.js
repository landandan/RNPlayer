/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import Video from 'react-native-video'

class Player extends Component {
  constructor(props){
    super(props)
  }

  props: {
    fileSrc: string,
    muted: boolean,
    volume: number,
    paused: boolean,
  }

  render() {
    //console.log('this.props.fileSrc:', this.props.fileSrc)
    return(
      <Video
        source={{uri: (this.props.fileSrc || 'http://m2.music.126.net/7WiRhPdirEJ2axW9Xm6uJQ==/1415071481819545.mp3')}}
        //ref='video'
        muted={this.props.muted}
        volume={this.props.volume}
        paused={this.props.paused}
        //onProgress={(e) => this.onProgress(e)}
        //onLoad={(e) => this.onLoad(e)}
      />
    )
  }
}

export default Player