/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Body, Text,
} from 'native-base'

class SongList extends Component {
  render() {
    const songList = this.props.songList
    const navigation = this.props.navigation
    return (
      <View style={{flex: 1}}>
        <List
          dataArray={songList || []}
          renderRow={
            item =>
              (<ListItem
                onPress={() => navigation.navigate('MusicPlayer')}
              >
                <Thumbnail
                  square size={80}
                  source={{ uri: item.picUrl }}
                />
                <Body>
                  <Text style={{ fontSize: 13 }}>{item.name}</Text>
                  <Text note style={{ fontSize: 11 }}>{item.copywriter}</Text>
                  <Text note style={{ fontSize: 11 }}>当前听众：{item.playcount}</Text>
                </Body>
              </ListItem>)
            }
        />
      </View>
    )
  }
}

export default SongList
