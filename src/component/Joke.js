/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
} from 'react-native'
import {
  Container, Content, List,
  ListItem,
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
                <ListItem style={{flexDirection: 'column', paddingBottom: 0}}>
                <View style={{flex: 1}}>
                  <Text>{item.group.text}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                  <Left>
                  <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <Icon name="thumbs-up"/>
                     <Text style={{marginLeft: -5}}>{item.group.digg_count}</Text>
                     <Icon name="thumbs-down" style={{marginLeft: 10}}/>
                     <Text style={{marginLeft: -5}}>{item.group.repin_count}</Text>
                  </View>
                  </Left>
                  <Right>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="chatboxes"/>
                    <Text>{item.group.comment_count}</Text>
</View>

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

export default connect(mapProps, mapAction)(Joke)