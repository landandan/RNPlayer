/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Body, Text, Icon, Right,
} from 'native-base'
import { connect } from 'react-redux'
import { playMusicList } from "../actions/playerAction";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 0x00000074,
    justifyContent: 'flex-end',
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 300,
  },
})

class MusicList extends Component {
  constructor(props) {
    super(props)
  }
  props: {
    visible: boolean,
    onCancel: () => void,
    musicData: Array<Object>,
    player: Object,
    playMusicList: (v) => void,
  }
  render() {
    const { currentMusicInfo } = this.props.player
    // TO DO
    // 点击其他歌曲时 不能同步刷新
    return (
      <Modal transparent visible={this.props.visible}
             animationType="fade" onRequestClose={this.props.onCancel}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={this.props.onCancel}>
          </TouchableOpacity>
          <View style={styles.contentWrapper}>
            <Container>
              <Content>
                <List
                  dataArray={this.props.musicData || []}
                  renderRow={
                    (item) =>
                      <ListItem
                       onPress={() => {
                         if(item.id !== currentMusicInfo.id){
                           this.props.playMusicList(item.id)
                         }
                       }}
                       style={{flexDirection: 'row'}}>
                        {
                          item.id === currentMusicInfo.id &&
                           <Icon name="musical-note" style={{paddingRight: 5,fontSize: 20,color: "#ff0000"}}/>
                        }
                        <Text style={{fontSize: 13}}>{item.songName}</Text>
                        <Text note style={{fontSize: 11}}> - {item.singer}</Text>
                        <Right>
                          <Icon name="trash"/>
                        </Right>
                      </ListItem>
                    }/>
              </Content>
            </Container>
          </View>
        </View>
      </Modal>
    )
  }
}


function mapProps(store) {
  const { player } = store || {}
  return {
    player,
  }
}

function mapAction(dispatch) {
  return {
    playMusicList: (v) => dispatch(playMusicList(v)),
  }
}

export default connect(mapProps, mapAction)(MusicList)