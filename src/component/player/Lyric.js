/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import StyleSheet from '../../utils/StyleSheet'

const styles = StyleSheet.create({
  itemStyle: {
    paddingTop: 20,
    height: 25,
    backgroundColor: 'rgba(255,255,255,0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

class Lyric extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lyrObj: [],
      scroll: {},
    }
  }

  state: {
    lyrObj: Array,
    scroll: Object,
  }

  setLyrObj(currentMusicLrc: {
    lrc: {
      lyric: '',
    }
  }) {
    let lyrObj = []
    let lry = (currentMusicLrc && currentMusicLrc.lrc && currentMusicLrc.lrc.lyric) || this.props.currentMusicLrc.lrc.lyric
    let lryAry = lry.split('\n')   //按照换行符切数组
    lryAry.forEach(function (val, index) {
      const obj = {}   //用于存放时间
      val = val.replace(/(^\s*)|(\s*$)/g, '')    //正则,去除前后空格
      let indeofLastTime = val.indexOf(']')  // ]的下标
      let timeStr = val.substring(1, indeofLastTime) //把时间切出来 0:04.19
      let minSec = ''
      let timeMsIndex = timeStr.indexOf('.')  // .的下标
      if ( timeMsIndex !== -1 ) {
        //存在毫秒 0:04.19
        minSec = timeStr.substring(1, val.indexOf('.'))  // 0:04.
        obj.ms = parseInt(timeStr.substring(timeMsIndex + 1, indeofLastTime))  //毫秒值 19
      } else {
        //不存在毫秒 0:04
        minSec = timeStr
        obj.ms = 0
      }
      let curTime = minSec.split(':')  // [0,04]
      obj.min = parseInt(curTime[0])   //分钟 0
      obj.sec = parseInt(curTime[1])   //秒钟 04
      obj.txt = val.substring(indeofLastTime + 1, val.length) //歌词文本: 留下唇印的嘴
      obj.txt = obj.txt.replace(/(^\s*)|(\s*$)/g, '')
      obj.dis = false
      obj.total = obj.min * 60 + obj.sec + obj.ms / 100   //总时间
      if ( obj.txt.length > 0 ) {
        lyrObj.push(obj)
      }
    })
    this.setState({
      lyrObj,
    })
  }

  componentWillMount() {
    this.setLyrObj()
  }

  componentWillReceiveProps(nextProps: Object) {
    if ( nextProps.currentMusicLrc != this.props.currentMusicLrc ) {
      this.setLyrObj(nextProps.currentMusicLrc)
    }
  }

  _scrollView: ScrollView

  renderLrc() {
    // 数组
    let itemAry = [];
    const lyrObj = this.state.lyrObj
    for (let i = 0; i < lyrObj.length; i++) {
      let item = lyrObj[i].txt
      if ( this.props.status.currentTime.toFixed(2) > lyrObj[i].total &&
        this.props.status.currentTime.toFixed(2) <
        lyrObj[(i + 1 < lyrObj.length ? i + 1 : lyrObj.length - 1)].total ) {
        //正在唱的歌词
        itemAry.push(
          <View key={i} style={styles.itemStyle}>
            <Text style={{ color: '#B72712' }}> {item} </Text>
          </View>
        );
        //this._scrollView && this._scrollView.scrollTo({ x: 0, y: (25 * i), animated: true });
      } else {
        //所有歌词
        itemAry.push(
          <View key={i} style={styles.itemStyle}>
            <Text style={{ color: 'black' }}> {item} </Text>
          </View>
        )
      }
    }
    return itemAry
  }

  componentDidUpdate(prevProps) {
    const { currentTime } = prevProps.status
    if ( currentTime != this.props.status.currentTime ) {
      const lyrObj = this.state.lyrObj
      for (let i = 0; i < lyrObj.length; i++) {
        if ( this.props.status.currentTime.toFixed(2) > lyrObj[i].total &&
          this.props.status.currentTime.toFixed(2) <
          lyrObj[(i + 1 < lyrObj.length ? i + 1 : lyrObj.length - 1)].total ) {
          this._scrollView && this._scrollView.scrollTo({
            x: 0,
            y: (25 * i - 150),
            animated: true
          });
        }
      }
    }
    //console.log('prevProps:', prevProps)
  }

  render() {
    return (
      <View style={{alignItems:'center', justifyContent: 'center', paddingBottom: 105}}>
        <ScrollView
          style={{position:'relative'}}
          ref={(scrollView) => { this._scrollView = scrollView}}
        >
          {this.renderLrc()}
        </ScrollView>
      </View>
    )
  }
}

function mapProps(store) {
  const { currentMusicLrc = {}, status = {} } = store.player
  return {
    currentMusicLrc,
    status,
  }
}

export default connect(mapProps)(Lyric)