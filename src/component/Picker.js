/**
 * @flow
 */
import { Platform, Picker } from 'react-native'
import PickerAndroid from 'react-native-picker-android'

export default Platform.OS === 'ios' ? Picker : PickerAndroid
