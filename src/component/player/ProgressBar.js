/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Slider,
} from 'react-native'
import {
  Text,
} from 'native-base'

class ProgressBar extends Component {
  constructor(props){
    super(props)
  }

  props: {
    currentValue: number,
  }

  render() {
    return(
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
        }}>
        <Text note>00:00</Text>
        <Slider
          style={{ marginLeft: 10, marginRight: 10, flex: 1}}
          value={this.props.currentValue}
          step={1}
          minimumTrackTintColor='#FFDB42'
          //onValueChange={(value) => this.props.volumeChange(value)}
        />
        <Text note>03:23</Text>
      </View>
    )
  }
}

export default ProgressBar