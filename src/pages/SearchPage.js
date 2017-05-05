/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container,
  Header, Input, Icon, Button,
  Text, Item, Content, List, ListItem,
  Thumbnail, Body,
} from 'native-base'
import { connect } from 'react-redux'
import { setSearchResultList, playFindMusic } from "../actions/playerAction";

class SearchPage extends Component {
  constructor() {
    super()
    this.state = {
      searchContent: '',
    }
  }

  state: {
    searchContent: string,
  }

  render() {
    const navigation = this.props.navigation
    return (
      <Container>
        <Header searchBar rounded>
          <Button
            transparent
            onPress={() => navigation.goBack(null)}
          >
            <Icon name='arrow-round-back' style={{ marginLeft: -10 }}/>
          </Button>
          <Item>
            <Icon name="search"/>
            <Input
              placeholder="搜索歌曲名或歌手名"
              onChangeText={(v) => {
                this.setState({
                  searchContent: v,
                })
              }}/>
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
                          id: parseInt(item.f.split('|')[0] ),
                          songName: item.fsong || '未知',
                          singer: item.fsinger || '佚名',
                          imgSrc: item.f.split('|')[4] && 'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg',
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
    setSearchResultList: async(r) => dispatch(await setSearchResultList(r)),
    playFindMusic: (r) => dispatch(playFindMusic(r)),
  }
}

export default connect(mapProps, mapAction)(SearchPage)