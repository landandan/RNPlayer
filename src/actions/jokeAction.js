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

export function setJokeList(callback?: () => void) {
  return async () => {
    try {
      const jokeList = await getJokeFormTouTiao()
      if(callback){
        callback(jokeList)
      }
      return {
        type: 'setJokeList',
        jokeList,
      }
    } catch (e){
      if(callback){
        callback()
      }
    }
  }
}