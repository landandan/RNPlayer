/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Animated,
  Easing,
  Image,
} from 'react-native'

let myAnimate
class Disc extends Component {
  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
  }

  // 旋转动画
  spin() {
    this.spinValue.setValue(0)
    myAnimate = Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      },
    ).start(() => this.spin())
  }

  componentWillMount() {
    this.spin()   //   启动旋转
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })
    return (
      <View style={{ marginVertical: 30 }}>
        <Image
          source={require('../../images/胶片盘.png')}
          style={{ width: 220, height: 220, alignSelf: 'center' }}
        />

        {/* 旋转小图*/}
        <Animated.Image
          ref="myAnimate"
          style={{
            width: 140,
            height: 140,
            marginTop: -180,
            alignSelf: 'center',
            borderRadius: 140 * 0.5,
            transform: [{ rotate: spin }] }}
          source={require('../../images/header.jpeg')}
        />
      </View>
    )
  }
}

export default Disc
