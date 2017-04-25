/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import {
  Container, Content, List,
  ListItem, Text,
  Left, Right, Icon,
} from 'native-base'
import { connect } from 'react-redux'

class Joke extends Component {
  render() {
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.data || []}
            renderRow={
              (item) =>
                <ListItem style={{flexDirection: 'column'}}>
                <View style={{flex: 1}}>
                <Text>{JSON.parse(item.content).content}</Text>
</View>

                  <View style={{flexDirection: 'row'}}>
                    <Left>
                       <Icon name="thumbs-up"/>
                       <Text note>{JSON.parse(item.content).digg_count}</Text>
                       <Icon name="thumbs-down"/>
                       <Text note>{JSON.parse(item.content).repin_count}</Text>
</Left>
<Right>
  <Icon name="chatboxes"/>
                       <Text note>{JSON.parse(item.content).comment_count}</Text>
</Right>
                  </View>
                </ListItem>
            }
          />
        </Content>
      </Container>
    )
  }
}

function mapProps(store) {
  const { jokeList = {} } = store.joke || {}
  const { data = [] } = jokeList
  return {
    data,
  }
}

function mapAction(dispatch) {
  return {}
}

export default connect(mapProps, mapAction())(Joke)