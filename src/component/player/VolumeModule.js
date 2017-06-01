/**
 * @flow
 */
import React, { Component } from 'react'
import {
  View,
  Slider,
  TouchableOpacity,
} from 'react-native'
import {
  Icon,
} from 'native-base'
import { connect } from 'react-redux'
import { mutedChange, volumeChange } from '../../actions/playerAction'

class VolumeModule extends Component {
  constructor(props) {
    super(props)
  }
  props: {
    status: Object,
    mutedChange: () => void,
    volumeChange: (v) => void,
  }

  render() {
    const { muted, volume } = this.props.status
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={this.props.mutedChange}
          style={{ marginLeft: 10 }}
        >
          {/* volume-off:静音,volume-up：有声音*/}
          <Icon name={muted ? 'volume-off' : 'volume-up'} />
        </TouchableOpacity>
        <Slider
          style={{ marginLeft: 10, marginRight: 10, flex: 1 }}
          value={volume}
          step={0.1}
          minimumTrackTintColor="#FFDB42"
          onValueChange={value => this.props.volumeChange(value)}
        />
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
    mutedChange: () => dispatch(mutedChange()),
    volumeChange: v => dispatch(volumeChange(v)),
  }
}

export default connect(mapProps, mapAction)(VolumeModule)
