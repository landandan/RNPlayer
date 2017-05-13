/**
 * @flow
 */
import { getJokeFormTouTiao } from "../utils/API/TouTiaoAPI/JokeAPI"

export function setJokeInfo(jokeInfo: Object) {
  return {
    type: 'setJokeInfo',
    jokeInfo,
  }
}

export async function setJokeList() {
  return async(store) => {
    const { jokeInfo = {} } = store.joke
    const jokeList = await getJokeFormTouTiao({ minBeHotTime: jokeInfo.minBeHotTime || '' })
    return [{
      type: 'setJokeList',
      jokeList,
    }, setJokeInfo({ minBeHotTime: new Date().getTime().toString().substring(0, 10) })]
  }
}