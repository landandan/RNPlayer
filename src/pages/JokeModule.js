/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
} from 'react-native'
import Joke from '../component/Joke'

class JokeModule extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Joke />
      </View>
    )
  }
}

export default JokeModule