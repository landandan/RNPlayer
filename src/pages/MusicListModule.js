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
import {
  Icon
} from 'native-base'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { songListHotTags } from '../utils/API/NeteaseCloudMusicApi/recommendSongList'
import musicListDate from '../actions/MusicListModuleAction'

const { width } = Dimensions.get('window')
const songListName = Object.keys(songListHotTags)

class MusicListModule extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.getMusicList(songListName[0])
  }
  render() {
    return(
      <View style={{flex:1}}>
        <View style={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-around',
            alignItems:'center',
            marginBottom:10
          }}
        >
          {
            _.map(songListName,(item,i) => {
              return (
                <TouchableOpacity key={i}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderWidth:1,
                        borderColor:'#ccc',
                        borderRadius:10,
                        marginTop:5,
                      }}
                      onPress={
                        () => {
                          this.props.getMusicList(item)
                        }
                      }
                >
                  <Text style={{fontSize:16}}>{item}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
        <View style={{
          flex:1,
        }}>
          <ScrollView contentContainerStyle={{
             flexDirection:'row',
             flexWrap:'wrap',
             justifyContent:'space-between'
          }}>
            {
              this.props.musicListData.playlists && _.map(this.props.musicListData.playlists,(mV,k) => {
                return (
                  <TouchableOpacity key={k} style={{
                    marginBottom:20
                  }}>
                    <Image
                      style={{
                      width:width/2-2,
                      height:width/2-2
                    }}
                    source={{uri:mV.coverImgUrl}}
                  >
                      <View
                        style={{
                          backgroundColor:'transparent',
                          flexDirection:'row',
                          position:'absolute',
                          top:3,
                          right:5
                        }}
                      >
                        <Icon name="headset" style={{
                          color:'#fff',
                          fontSize:14
                        }}/>
                        <Text style={{
                          color:'#fff',
                          fontSize:14
                        }}
                        >
                          {mV.playCount}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor:'transparent',
                          flexDirection:'row',
                          position:'absolute',
                          left:5,
                          bottom:5
                        }}
                      >
                        <Icon name="person"
                              style={{
                                color:'#fff',
                                fontSize:14
                              }}
                        />
                        <Text style={{
                            color:'#fff',
                            fontSize:14
                          }}
                        >
                          {mV.creator.nickname}
                        </Text>
                      </View>
                    </Image>
                    <Text
                      style={{
                        lineHeight:18,
                        paddingHorizontal:5,
                        width:width/2-2,
                        paddingTop:5
                      }}
                    >{mV.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
          </ScrollView>
        </View>
      </View>
    )
  }
}
function mapProps(store) {
  const { musicListData } = store
  return {
    musicListData
  }
}
function mapActions(dispatch) {
  return {
    getMusicList: compose(dispatch,musicListDate),
  }
}

export default connect(mapProps,mapActions)(MusicListModule)