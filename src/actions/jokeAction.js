/**
 * @flow
 */
import { getJokeFormTouTiao } from "../utils/API";

export function setJokeInfo(jokeInfo: Object) {
  return {
    type: 'setJokeInfo',
    jokeInfo,
  }
}

export async function setJokeList() {
  return async (dispatch: () => void, getState: () => void) => {
    const store = getState() || {}
    const { jokeInfo = {} } = store.joke
    const jokeList = await getJokeFormTouTiao({minBeHotTime: jokeInfo.minBeHotTime || ''})
    return [dispatch({
      type: 'setJokeList',
      jokeList,
    }), dispatch(setJokeInfo({minBeHotTime: new Date().getTime().toString().substring(0,10)}))]
  }
}