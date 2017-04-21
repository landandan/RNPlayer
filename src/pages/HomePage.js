/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux'
import {
  Container, Header,
  Title, Content, Footer,
  FooterTab, Button, Left,
  Right, Body, Icon, Drawer,
  Item, Input, Tabs, Tab,
} from 'native-base'

import { Actions } from 'react-native-router-flux'
import Sidebar from '../component/Sidebar'
import { getMusicList } from "../utils/API";
import { setMusicList, setCurrentMusicInfo } from "../actions/playerAction";
import HomeFooter from '../component/HomeFooter'
import HomeSwiper from '../component/HomeSwiper'
import SongList from '../component/SongList'
import { setNETSHomeData } from "../actions/homeAction"

const { width } = Dimensions.get('window')

class HomePage extends Component {
  componentWillMount() {
    this.init()
  }

  async init() {
    const result = await getMusicList()
    this.props.setMusicList(result)
    if ( result && result.song_list && result.song_list.length > 0 ) {
      this.props.setCurrentMusicInfo(result.song_list[0])
    }
    this.props.setNETSHomeData()
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
          <Header searchBar hasTabs>
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
              {
                console.log('banners:', this.props.banners)
              }
              <View style={{height: width * 200 / 540, width}}>
                <HomeSwiper banners={this.props.banners}/>
              </View>
              <SongList songList={this.props.hotspot}/>
            </Tab>
            <Tab heading={ <View><Text>歌单</Text></View>}>
              <Text>歌单</Text>
            </Tab>
            <Tab heading={ <View><Text>排行榜</Text></View>}>
              <Text>排行榜</Text>
            </Tab>
          </Tabs>
          <Footer>
            <HomeFooter/>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}

function mapProps(store) {
  console.log('store:', store)
  const { NETSHomeData } = store.homePage || {}
  const { banners = [], hotspot = [] } = NETSHomeData || {}
  return {
    banners,
    hotspot,
  }
}

function mapAction(dispatch) {
  return {
    setMusicList: (r) => dispatch(setMusicList(r)),
    setCurrentMusicInfo: (r) => dispatch(setCurrentMusicInfo(r)),
    setNETSHomeData: async()=>dispatch(await setNETSHomeData()),
  }
}

export default connect(mapProps, mapAction)(HomePage)