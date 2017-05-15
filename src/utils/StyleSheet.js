/**
 * @flow
 */

import { StyleSheet, Platform } from 'react-native'

function create(styles: Object): { [name: string]: any } {
  function styleFor(name) {
    const { ios, android, ...style } = { ...styles[name] }
    if ( ios && Platform.OS === 'ios' ) {
      return { ...style, ...ios }
    } else if ( android && Platform.OS === 'android' ) {
      return { ...style, ...android }
    }
    return style
  }

  const result: Object = Object.keys(styles).map(key => ({ [key]: styleFor(key) }))
    .reduce((loop, next) => ({
      ...loop,
      ...next,
    }), {})
  return StyleSheet.create(result)
}

export default {
  ...StyleSheet,
  create,
}
