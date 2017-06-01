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
import { connect } from 'react-redux'
import { transformTime } from '../../utils/Common'

class ProgressBar extends Component {
  constructor(props) {
    super(props)
  }

  props: {
    status: Object,
  }

  render() {
    const { currentTime, duration } = this.props.status
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 5,
          position: 'absolute',
          bottom: 5,
        }}
      >
        <Text note>{transformTime(currentTime)}</Text>
        <Slider
          style={{ marginLeft: 10, marginRight: 10, flex: 1 }}
          value={currentTime}
          step={1}
          maximumValue={duration}
          minimumTrackTintColor="#FFDB42"
        />
        <Text note>{transformTime(duration)}</Text>
      </View>
    )
  }
}

function mapProps(store) {
  const { player } = store || {}
  const { status = {} } = player
  return {
    status,
  }
}

function mapAction(dispatch) {
  return {

  }
}


export default connect(mapProps, mapAction)(ProgressBar)
