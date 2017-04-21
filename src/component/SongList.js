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
    return(
      <Container>
        <Content>
          <List dataArray={songList || []}
                renderRow={
                  (item) =>
                    <ListItem>
                      <Thumbnail square size={80}
                       source={{uri: item.picUrl}} />
                      <Body>
                      <Text style={{fontSize: 13}}>{item.name}</Text>
                      <Text note style={{fontSize: 11}}>{item.copywriter}</Text>
                      </Body>
                    </ListItem>
                  }/>
        </Content>
      </Container>
    )
  }
}

export default SongList