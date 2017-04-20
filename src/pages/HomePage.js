/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
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

class MainPage extends Component {
  async componentWillMount(){
    const result = await getMusicList()
    this.props.setMusicList(result)
    if(result && result.song_list && result.song_list.length > 0){
      this.props.setCurrentMusicInfo(result.song_list[0])
    }
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
              <Text>推荐</Text>
            </Tab>
            <Tab heading={ <View><Text>歌单</Text></View>}>
              <Text>歌单</Text>
            </Tab>
            <Tab heading={ <View><Text>排行榜</Text></View>}>
              <Text>排行榜</Text>
            </Tab>
          </Tabs>
          <Content>

          </Content>

          <Footer>
            <HomeFooter/>
          </Footer>
        </Container>
      </Drawer>
    );
  }
}

function mapProps(store) {
  return {}
}

function mapAction(dispatch) {
  return {
    setMusicList: (r) => dispatch(setMusicList(r)),
    setCurrentMusicInfo: (r) => dispatch(setCurrentMusicInfo(r))
  }
}

export default connect(mapProps, mapAction)(MainPage)