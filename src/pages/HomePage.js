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

import Sidebar from '../component/Sidebar'
import { setPlayMusicList, setCurrentMusicInfo } from "../actions/playerAction";
import HomeFooterWithPlayControl from '../component/HomeFooterWithPlayControl'
import HomeFooterWithTabs from '../component/HomeFooterWithTabs'
import HomeSwiper from '../component/HomeSwiper'
import SongList from '../component/SongList'
import Joke from '../component/Joke'
import { setNETSHomeData } from "../actions/homeAction"
import getSongListByType from '../utils/API/NeteaseCloudMusicApi/recommendSongList'
import InitMusicList from "../utils/InitMusicList"
import { setJokeList } from "../actions/jokeAction"
import { pushOrPopToRoute } from "../actions/routeAction";
import PlayControlForHeader from '../component/PlayControlForHeader'
import AudioPlayer from '../component/AudioPlayer'
import Recommend from '../component/home/Recommend'

const { width } = Dimensions.get('window')

class HomePage extends Component {

  componentWillMount() {
    this.init()
  }

  async init() {
    const musicData = InitMusicList.musicData
    this.props.setPlayMusicList(musicData)
    this.props.setCurrentMusicInfo(musicData[0])
    this.props.setNETSHomeData()
    this.props.setJokeList()
    //const result = await getSongListByType()
    //console.log('result:', result)
  }

  closeDrawer() {
    this._drawer._root.close()
  }

  openDrawer() {
    this._drawer._root.open()
  }

  render() {
    const active = this.props.homeFooterTab.active
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
            <PlayControlForHeader/>
            <Right>
              <Button transparent onPress={() => this.props.pushOrPopToRoute({ routeName: 'Search' })}>
                <Icon name='search'/>
              </Button>
            </Right>
          </Header>
          {
            active === '推荐' && <Recommend />
          }
          {
            active === '段子' && <Joke />
          }
          <Footer>
            <HomeFooterWithTabs/>
            {/*<HomeFooterWithPlayControl*/}
              {/*musicData={InitMusicList.musicData}*/}
            {/*/>*/}
          </Footer>
          <AudioPlayer />
        </Container>
      </Drawer>
    );
  }
}

function mapProps(store) {
  //console.log('store:', store)
  const { NETSHomeData } = store.homePage || {}
  const { homeFooterTab = {} } = store.homePage || {}
  const { banners = [], hotspot = [] } = NETSHomeData || {}
  return {
    banners,
    hotspot,
    homeFooterTab,
  }
}

function mapAction(dispatch) {
  return {
    setPlayMusicList: (r) => dispatch(setPlayMusicList(r)),
    setCurrentMusicInfo: (r) => dispatch(setCurrentMusicInfo(r)),
    setNETSHomeData: async() => dispatch(await setNETSHomeData()),
    setJokeList: async() => dispatch(await setJokeList()),
    pushOrPopToRoute: (v) => dispatch(pushOrPopToRoute(v)),
  }
}

export default connect(mapProps, mapAction)(HomePage)