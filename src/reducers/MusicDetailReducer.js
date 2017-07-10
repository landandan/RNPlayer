/**
 * @flow
 */
export default function getMusicDetailMsg(state = {},action = {}) {
  if (action.type === 'page/getMusicListDetail') {
    return {
      ...state,
      ...action.MusicDetailMsg
    }
  }
  return state
}
