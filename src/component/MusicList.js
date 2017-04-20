/**
 * @flow
 */
import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 0x00000074,
    justifyContent: 'flex-end',
  },
  title: {
    padding: 13,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
    color: '#2F2F2F',
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderTopColor: '#DDDDDD',
    borderBottomColor: '#DDDDDD',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 300,
  },
  buttonWrapper: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
    padding: 13,
  },
  buttonText: {
    color: '#0074E1',
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 18,
  },
  separator: {
    backgroundColor: '#E5E5E5',
    width: 1,
  },
})

export default class MusicList extends Component {
  constructor(props) {
    super(props)
  }
  props: {
    visible: boolean,
    onCancel: () => void,
  }
  render() {
    return (
      <Modal transparent visible={this.props.visible}
             animationType="fade" onRequestClose={this.props.onCancel}>
        <View style={styles.container}>
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={this.props.onCancel}>

          </TouchableOpacity>
          <View style={styles.contentWrapper}>

          </View>
        </View>
      </Modal>
    )
  }
}