/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native'
import {
  Container, Content, List,
  ListItem,
  Left, Right, Icon,
} from 'native-base'
import { connect } from 'react-redux'
import { PushToJokeDetails } from '../actions/jokeAction'


class Joke extends Component {
  render() {
    const navigation = this.props.navigation
    return (
      <Container>
        <Content>
          <List
            dataArray={this.props.data || []}
            renderRow={
              item =>
                (<TouchableOpacity
                  style={{ flexDirection: 'column', paddingBottom: 0, backgroundColor: '#c9c9c9'}}
                  onPress={() => {
                    this.props.pushToJokeDetails(item.group, item.group.id)
                    navigation.navigate('JokeDetails')
                  }}
                >
                  <View style={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    shadowColor: "#000000",
                    shadowOpacity: 0.3,
                    shadowRadius: 1,
                    shadowOffset: {
                      height: 1,
                      width: 0.3,
                    },
                    flex: 1,
                    paddingHorizontal: 15,
                    marginBottom: 10,
                    paddingTop: 10,
                  }}>
                    <View style={{ flex: 1 }}>
                      <Text>{item.group.text}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                      <Left>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                          <Icon name="thumbs-up" style={{fontSize: 22}}/>
                          <Text style={{ marginLeft: 3 }}>{item.group.digg_count}</Text>
                          <Icon name="thumbs-down" style={{ marginLeft: 10, fontSize: 22 }} />
                          <Text style={{ marginLeft: 3 }}>{item.group.repin_count}</Text>
                        </View>
                      </Left>
                      <Right>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <Icon name="chatboxes" style={{fontSize: 22}}/>
                          <Text style={{ marginLeft: 3 }}>{item.group.comment_count}</Text>
                        </View>
                      </Right>
                    </View>
                  </View>
                </TouchableOpacity>)
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
  return {
    pushToJokeDetails: (o, s) => dispatch(PushToJokeDetails(o, s)),
  }
}

export default connect(mapProps, mapAction)(Joke)
