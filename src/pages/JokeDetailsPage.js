/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  ScrollView,
} from 'react-native'
import { connect } from 'react-redux'
import {
  Header,
  Left,
  Body,
  Right,
  Icon,
  Button,
  Thumbnail,
} from 'native-base'
import moment from 'moment'

class JokeDetailsPage extends Component {
  render() {
    const group = this.props.group || {}
    const jokeText = group.text || ''
    const navigation = this.props.navigation
    const data = this.props.comments.data || []
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => navigation.goBack(null)}
            >
              <Icon name="arrow-round-back" />
            </Button>
          </Left>
          <Body>
            <Text>详情</Text>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                alert('提示', '该功能正在开发中！')
              }}
            >
              <Icon name="share" />
            </Button>
          </Right>
        </Header>
        <View style={{
          padding: 10,
        }}
        >
          <Text>{jokeText}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button light rounded>
            <Icon name="thumbs-up" />
            <Text>{group.digg_count}</Text>
          </Button>
          <Button light rounded>
            <Icon name="thumbs-down" />
            <Text>{group.repin_count}</Text>
          </Button>
        </View>
        <View style={{
          borderColor: '#ccc',
          borderBottomWidth: 1,
          marginHorizontal: 10,
        }}
        >
          <Text style={{ lineHeight: 20 }}>评论</Text>
        </View>
        <ScrollView style={{ paddingHorizontal: 10 }}>
          {
            data.map((item, index) => {
              const comment = item.comment || {}
              const createTime = moment(Number(comment.create_time || 0)).format('YYYY-MM-DD hh:mm')
              return (<View style={{ flexDirection: 'row', paddingTop: 15 }} key={index}>
                <Thumbnail size={40} source={{ uri: comment.user_profile_image_url }} />
                <View style={{
                  paddingLeft: 10,
                  flex: 1,
                }}
                >
                  <View style={{ height: 40, justifyContent: 'center' }}>
                    <View>
                      <Text style={{ color: '#ccc' }}>{comment.user_name}</Text>
                      <Text style={{ fontSize: 10, color: '#ccc' }}>{createTime}</Text>
                    </View>
                  </View>
                  <Text>{comment.text}</Text>
                </View>
              </View>)
            },
              )
          }
        </ScrollView>
      </View>
    )
  }
}

function mapProps(store) {
  const { currentJokeDetails = {} } = store.joke
  const { group, comments } = currentJokeDetails
  return {
    group,
    comments,
  }
}


function mapAction(dispatch) {
  return {

  }
}

export default connect(mapProps, mapAction)(JokeDetailsPage)
