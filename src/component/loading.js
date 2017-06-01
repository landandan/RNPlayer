/**
 * @flow
 */
import React from 'react'
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from 'native-base'
import StyleSheet from '../utils/StyleSheet'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

type PropType = {
  isLoading: boolean,
}

function Loading({ isLoading }: PropType) {
  if (!isLoading) {
    return null
  }
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Spinner color="red" />
      </View>
    </TouchableWithoutFeedback>
  )
}

function mapProps(store) {
  return {
    isLoading: store.loading.loadingQueue > 0 && store.loading.enableLoading,
  }
}

export default connect(mapProps)(Loading)
