/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'
import {
  Icon,
  Button,
  Thumbnail,
} from 'native-base'

class Sidebar extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Image
          source={require('../images/BK1024.png')}
          style={{width: undefined,  height: undefined, justifyContent: 'center', }}>
          <Thumbnail
            style={{width: 80, height: 80, borderRadius: 40, marginVertical: 30, marginLeft: 20}}
            source={require('../images/header.jpeg')}/>
        </Image>
        <Button
          iconLeft light full
          onPress={() => {alert('提示', '该功能正在开发中')}}
          style={{ marginBottom: 5, justifyContent: 'flex-start' }}>
          <Icon name='bicycle'/>
          <Text>动态</Text>
        </Button>

        <Button
          light full
          onPress={() => {alert('提示', '该功能正在开发中')}}
          style={{ marginBottom: 5, justifyContent: 'flex-start'  }}>
          <Icon name='star'/>
          <Text>收藏</Text>
        </Button>

        <Button
          light full
          onPress={() => {alert('提示', '该功能正在开发中')}}
          style={{ justifyContent: 'flex-start'  }}>
          <Icon name='alarm'/>
          <Text>历史</Text>
        </Button>
      </View>
    )
  }
}

export default Sidebar