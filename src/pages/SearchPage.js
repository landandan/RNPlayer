/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Container,
  Header, Input, Icon, Button,
  Text, Item, Content, List, ListItem,
  Thumbnail, Body, Right, Left,
} from 'native-base'
import { connect } from 'react-redux'
import { playFindMusic } from '../actions/playerAction'
import { searchNetease, reset } from '../actions/searchAction'

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

  async searchResource(keywords: string) {
    await this.props.searchNetease(keywords)
  }

  componentWillUnmount() {
    this.props.reset()
  }

  render() {
    const navigation = this.props.navigation
    const { searchHistory = [], searchResult = {} } = this.props.searchPage
    return (
      <Container>
        <Header searchBar rounded>
          <Button
            transparent
            onPress={() => navigation.goBack(null)}
          >
            <Icon name="arrow-round-back" style={{ marginLeft: -10 }} />
          </Button>
          <Item>
            <Icon name="search" />
            <Input
              placeholder="搜索歌曲名或歌手名"
              onChangeText={(v) => {
                this.setState({
                  searchContent: v,
                })
              }}
            />
          </Item>
          <TouchableOpacity
            transparent
            onPress={async () => {
              await this.searchResource(this.state.searchContent)
            }}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 5,
            }}
          >
            <Text>搜索</Text>
          </TouchableOpacity>
        </Header>
        <Content>
          <List
            dataArray={searchResult.songs || []}
            renderRow={
                  item =>
                    (<ListItem
                      onPress={() => {
                        this.props.playFindMusic(item)
                      }}
                    >
                      <Thumbnail
                        square
                        size={80}
                        source={{ uri: item.album.picUrl }}
                      />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note>{item.artists[0].name}</Text>
                      </Body>
                    </ListItem>)
                  }
          />

        </Content>
      </Container>
    )
  }
}

function mapProps(store) {
  const { searchPage = {} } = store || {}
  return {
    searchPage,
  }
}

function mapAction(dispatch) {
  return {
    playFindMusic: r => dispatch(playFindMusic(r)),
    searchNetease: k => dispatch(searchNetease(k)),
    reset: () => dispatch(reset()),
  }
}

export default connect(mapProps, mapAction)(SearchPage)
