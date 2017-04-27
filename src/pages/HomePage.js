/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header,
  Footer, Button, Left,
  Right, Icon, Drawer,
  Tabs, Tab,
} from 'native-base'

import { Actions } from 'react-native-router-flux'
import Sidebar from '../component/Sidebar'
import { setPlayMusicList, setCurrentMusicInfo } from "../actions/playerAction";
import HomeFooter from '../component/HomeFooter'
import HomeSwiper from '../component/HomeSwiper'
import SongList from '../component/SongList'
import Joke from '../component/Joke'
import { setNETSHomeData } from "../actions/homeAction"
import InitMusicList from "../utils/InitMusicList"
import { setJokeList } from "../actions/jokeAction";

const { width } = Dimensions.get('window')

class HomePage extends Component {

  componentWillMount() {
    this.init()
  }

  async init() {
    //const result = await getMusicList()
    const musicData = InitMusicList.musicData
    this.props.setPlayMusicList(musicData)
    this.props.setCurrentMusicInfo(musicData[0])
    this.props.setNETSHomeData()
    this.props.setJokeList()
  }

  closeDrawer() {
    this._drawer._root.close()
  }

  openDrawer() {
    this._drawer._root.open()
  }

  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<Sidebar />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header hasTabs>
            <Left>
              <Button
                transparent
                onPress={() =>{
                      this.openDrawer()
                    } }
              >
                <Icon name='menu'/>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={() => {Actions.searchPage()}}>
                <Icon name='search'/>
              </Button>
            </Right>
          </Header>
          <Tabs>
            <Tab heading={ <View><Text>推荐</Text></View>}>
              <View style={{height: width * 200 / 540, width}}>
                <HomeSwiper banners={this.props.banners}/>
              </View>
              <SongList songList={this.props.hotspot}/>
            </Tab>
            <Tab heading={ <View><Text>歌单</Text></View>}>
              <Text>歌单</Text>
            </Tab>
            <Tab heading={ <View><Text>段子</Text></View>}>
              <Joke />
            </Tab>
          </Tabs>
          <Footer>
            <HomeFooter
              musicData={InitMusicList.musicData}
            />
          </Footer>
          {/*<SoundModule />*/}
        </Container>
      </Drawer>
    );
  }
}

function mapProps(store) {
  //console.log('store:', store)
  const { NETSHomeData } = store.homePage || {}
  const { banners = [], hotspot = [] } = NETSHomeData || {}
  return {
    banners,
    hotspot,
  }
}

function mapAction(dispatch) {
  return {
    setPlayMusicList: (r) => dispatch(setPlayMusicList(r)),
    setCurrentMusicInfo: (r) => dispatch(setCurrentMusicInfo(r)),
    setNETSHomeData: async() => dispatch(await setNETSHomeData()),
    setJokeList: async() => dispatch(await setJokeList()),
  }
}

export default connect(mapProps, mapAction)(HomePage)