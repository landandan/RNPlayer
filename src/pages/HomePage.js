/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header,
  Footer, Button, Left,
  Right, Icon, Drawer,
  Tabs, Tab, Fab, Body,
} from 'native-base'

import Sidebar from '../component/Sidebar'
import { setPlayMusicList, setCurrentMusicInfo } from "../actions/playerAction";
import { setNETSHomeData } from "../actions/homeAction"
import InitMusicList from "../utils/InitMusicList"
import AudioPlayer from '../component/AudioPlayer'
import {
  addNavigationHelpers,
} from 'react-navigation'

class HomePage extends Component {

  componentWillMount() {
    this.init()
    this.state = {
      visible: false,
    }
  }

  async init() {
    const musicData = InitMusicList.musicData
    this.props.setPlayMusicList(musicData)
    this.props.setCurrentMusicInfo(musicData[0])
    this.props.setNETSHomeData()
  }

  closeDrawer() {
    this._drawer._root.close()
  }

  openDrawer() {
    this._drawer._root.open()
  }

  render() {
    const router = this.props.router
    const navigation = this.props.navigation
    const { routes, index } = navigation.state
    const ActiveScreen = router.getComponentForState(navigation.state)
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<Sidebar />}
        onClose={() => this.closeDrawer()}
      >
        <Container>
          <Header hasTabs
                  style={{backgroundColor: '#B72712', alignItems: 'center', justifyContent: 'center'}}>
            <Button
              transparent
              onPress={() =>{
                      this.openDrawer()
                    } }
            >
              <Icon name='menu' style={{color: 'white'}}/>
            </Button>
            <View
              style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center', flex: 1}}>
              {routes.map(route => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.routeName)}
                  key={route.routeName}
                >
                  {
                    route.routeName == 'Recommend' &&
                    <Icon name="musical-notes" style={{color: 'white'}}/>
                  }
                  {
                    route.routeName == 'MusicList' &&
                    <Icon name="document" style={{paddingHorizontal: 20,color: 'white'}}/>
                  }
                  {
                    route.routeName == 'Joke' && <Icon name="barcode" style={{color: 'white'}}/>
                  }

                </TouchableOpacity>
              ))}
            </View>
            <Button transparent onPress={() => navigation.navigate('Search')}>
              <Icon name='search' style={{color: 'white'}}/>
            </Button>
          </Header>
          <View style={{flex: 1}}>
            <ActiveScreen
              navigation={addNavigationHelpers({
                ...navigation,
                state: routes[index],
              })}
            />
          </View>
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
  }
}

export default connect(mapProps, mapAction)(HomePage)