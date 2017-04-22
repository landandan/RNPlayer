/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container,
  Header, InputGroup, Input, Icon, Button,
  Text, Item, Content, List, ListItem,
  Thumbnail, Body,
} from 'native-base'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { setSearchResultList, playFindMusic } from "../actions/playerAction";

class SearchPage extends Component {
  constructor(){
    super()
    this.state ={
      searchContent: '',
    }
  }
  state: {
    searchContent: string,
  }
  render() {
    return(
      <Container>
        <Header searchBar rounded>
          <Button
            transparent
            onPress={() =>{
                    Actions.pop()
                  } }
          >
            <Icon name='arrow-round-back' style={{ marginLeft: -10 }}/>
          </Button>
          <Item>
            <Icon name="search" />
            <Input
              placeholder="搜索歌曲名或歌手名"
              onChangeText={(v) => {
                this.setState({
                  searchContent: v,
                })
              }} />
          </Item>
          <Button
            transparent
            onPress={() => {
              //console.log('searchContent:', this.state.searchContent)
              this.props.setSearchResultList(this.state.searchContent)
            }}>
            <Text>搜索</Text>
          </Button>
        </Header>
        <Content>
          <List dataArray={this.props.searchResultList || []}
                renderRow={
                  (item) =>
                    <ListItem
                      onPress={() => {
                        this.props.playFindMusic({
                          songName: (item.f.split('|')[3]&& item.f.split('|')[3].replace(/amp\;/g, '').replace(/\;/g, '/') || '佚名')+' - '+item.fsong,
                          singer: '',
                          fileSrc: item.f.split('|')[0],
                          imgSrc: item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg',
                        })
                      }}
                    >
                      <Thumbnail square size={80}
                       source={{uri:item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg'}} />
                      <Body>
                        <Text>{item.fsong}</Text>
                        <Text note>{item.fsinger}</Text>
                      </Body>
                    </ListItem>
                  }>>

          </List>
        </Content>
      </Container>
    )
  }
}

function mapProps(store) {
  const { player } = store || {}
  const { searchResultList } = player
  return {
    searchResultList,
  }
}

function mapAction(dispatch) {
  return {
    setSearchResultList: async (r) => dispatch(await setSearchResultList(r)),
    playFindMusic: (r) => dispatch(playFindMusic(r)),
  }
}

export default connect(mapProps, mapAction)(SearchPage)