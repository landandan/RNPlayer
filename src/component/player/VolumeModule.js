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

class VolumeModule extends Component {
  constructor(props){
    super(props)
  }
  props: {
    muted: boolean,
    mutedChange: () => void,
    volume: number,
    volumeChange: (v) => void,
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={this.props.mutedChange}
          style={{ marginLeft: 10 }}
        >
          {/*volume-off:静音,volume-up：有声音*/}
          <Icon name={this.props.muted? 'volume-off': 'volume-up'}/>
        </TouchableOpacity>
        <Slider
          style={{ marginLeft: 10, marginRight: 10, flex: 1}}
          value={this.props.volume}
          step={0.1}
          minimumTrackTintColor='#FFDB42'
          onValueChange={(value) => this.props.volumeChange(value)}
        />
      </View>
    )
  }
}

export default VolumeModule