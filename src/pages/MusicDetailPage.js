/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native'
import _ from 'lodash'
import {
  Container, Header,
    Footer, Button, Left,
    Right, Icon, Drawer,
    Tabs, Tab, Fab, Body,
} from 'native-base'
import { connect } from 'react-redux'
import { compose } from 'redux'
import Stylesheet from '../utils/StyleSheet'
import getMusicListDetail, { getSongDetail } from '../actions/MusicDetailAction'

const { width } = Dimensions.get('window')
const styles = Stylesheet.create({
  wordAlign: {
    textAlign:'center'
  },
  AlignView: {
    alignItems: 'center'
  }
})

class MusicDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getMusicListDetail(this.props.recordMusicListId)
  }
  render() {
    const navigation = this.props.navigation
    const getMusicDetailMsg = this.props.getMusicDetailMsg.playlist
    const getAllMusicLength = this.props.getMusicDetailMsg.privileges.length
    return (
      <View style={{flex:1}}>
        <Header searchBar rounded>
          <Left>
            <Button
              transparent
              onPress={() => navigation.goBack(null)}
            >
              <Icon name='arrow-round-back' style={{ marginLeft: 5 }}/>
            </Button>
          </Left>
          <Body>
            <Text>歌单</Text>
          </Body>
          <Right>
            <Icon name='more'/>
            <Icon name='stats' style={{marginLeft:20}}/>
          </Right>
        </Header>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection:'row',
                paddingHorizontal:20,
                paddingVertical:10
              }}
            >
              <View>
                <Image
                  style={{
                    width:width/3,
                    height:width/3
                  }}
                  source={{ uri: getMusicDetailMsg.creator.backgroundUrl }}
                >
                  <View
                    style={{
                          backgroundColor: 'transparent',
                          flexDirection: 'row',
                          position: 'absolute',
                          top: 3,
                          right: 5,
                        }}
                  >
                    <Icon
                      name="headset" style={{
                            color: '#fff',
                            fontSize: 14,
                          }}
                    />
                    <Text style={{
                          color: '#fff',
                          fontSize: 14,
                        }}
                    >{getMusicDetailMsg.playCount}</Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      position: 'absolute',
                      bottom: 3,
                      right: 5,
                    }}
                  >
                    <Icon
                      name="ios-information-circle"
                      style={{
                        color: '#ccc',
                        fontSize: 24,
                      }}
                    />
                  </View>
                </Image>
              </View>
              <View>
                <View
                  style={{
                    paddingVertical:20,
                    paddingLeft:20,
                    width:width/1.7
                  }}
                >
                  <Text
                    style={{
                      fontSize:18,
                      color:'#000'
                    }}
                  >{getMusicDetailMsg.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection:'row',
                    paddingLeft:20,
                    width:width/1.7,
                    alignItems:'center'
                  }}
                >
                  <Image
                    style={{width:20,height:20}}
                    source={{ uri: getMusicDetailMsg.creator.avatarUrl }}
                  />
                  <Text
                    style={{
                      fontSize:14
                    }}
                  >{getMusicDetailMsg.creator.nickname}</Text>
                  <Icon name="arrow-forward"
                        style={{
                          marginLeft:10,
                          fontSize:18,
                          color:'#fff',
                        }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection:'row',
                justifyContent:'space-around'
              }}
            >
              <View style={styles.AlignView}>
                <Icon name="add-circle"/>
                <Text style={styles.wordAlign}>{getMusicDetailMsg.subscribedCount}</Text>
              </View>
              <View style={styles.AlignView}>
                <Icon name="card"/>
                <Text style={styles.wordAlign}>{getMusicDetailMsg.commentCount}</Text>
              </View>
              <View style={styles.AlignView}>
                <Icon name="share"/>
                <Text style={styles.wordAlign}>{getMusicDetailMsg.shareCount}</Text>
              </View>
              <View style={styles.AlignView}>
                <Icon  name="download"/>
                <Text style={styles.wordAlign}>下载</Text>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingHorizontal:10,
                paddingVertical:10
              }}
            >
              <View
                style={{
                  flexDirection:'row',
                }}
              >
                <View
                  style={{
                    width:20,
                    height:20,
                    borderWidth:1,
                    borderRadius:10,
                    borderColor:'black',
                    overflow:'hidden',
                    justifyContent:'center',
                    alignItems:'center',
                    marginRight:10
                }}
              >
                  <Icon name="ios-play" style={{fontSize:14}}/>
                </View>
                <Text>{`播放全部（共${getAllMusicLength}首）`}</Text>
              </View>
              <View
                style={{
                  flexDirection:'row',
                  alignItems:'center',
                }}
              >
                <Icon name="list"/>
                <View style={{paddingLeft:5,alignItems:'center'}}>
                  <Text>多选</Text>
                </View>
              </View>
            </View>
            {
              _.map(getMusicDetailMsg.tracks,(music,key) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection:'row',
                      alignItems:'center',
                      justifyContent:'space-between',
                      paddingHorizontal:10,
                      paddingVertical:10
                    }}
                    key={key}
                    onPress={
                      () => {
                        this.props.getSongDetailMsg(music.id)
                        navigation.navigate('MusicPlayer')
                      }
                    }
                  >
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                      }}
                    >
                      <View
                        style={{
                          width:20,
                          height:20,
                          borderWidth:1,
                          borderRadius:10,
                          borderColor:'black',
                          overflow:'hidden',
                          justifyContent:'center',
                          alignItems:'center',
                          marginRight:10
                        }}
                      >
                        <Text>{key+1}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize:18}}>{music.name}</Text>
                        <Text style={{fontSize:12}}>{music.al.name}</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection:'row',
                        alignItems:'center',
                      }}
                    >
                      <Icon name="more"/>
                    </View>
                  </TouchableOpacity>
                )
              })
            }

          </View>
        </ScrollView>
      </View>
    )
  }
}

function mapProps(store) {
  const { musicListData: { recordMusicListId }, getMusicDetailMsg } = store
  return {
    recordMusicListId,
    getMusicDetailMsg,
  }
}
function mapActions(dispatch) {
  return {
    getMusicListDetail: compose(dispatch,getMusicListDetail),
    getSongDetailMsg: compose(dispatch,getSongDetail),
  }
}

export default connect(mapProps,mapActions)(MusicDetails)