/**
 * @flow
 */
import { getJokeFormTouTiao, getJokeComments } from '../utils/API/TouTiaoAPI/JokeAPI'

export function setJokeInfo(jokeInfo: Object) {
  return {
    type: 'setJokeInfo',
    jokeInfo,
  }
}

export async function setJokeList(callback?: () => void) {
  try {
    const jokeList = await getJokeFormTouTiao()
    if (callback) {
      callback(jokeList)
    }
    return {
      type: 'setJokeList',
      jokeList,
    }
  } catch (e) {
    if (callback) {
      callback()
    }
  }
}

const setCurrentJokeDetailsGroup = (group: Object) => ({
  type: 'setCurrentJokeDetailsGroup',
  group,
})

const setCurrentJokeDetailsComments = async (groupId: string) => {
  const comments = await getJokeComments(groupId)
  return {
    type: 'setCurrentJokeDetailsComments',
    comments,
  }
}

export const PushToJokeDetails = (group: Object, groupId: string) => [
  setCurrentJokeDetailsGroup(group),
  setCurrentJokeDetailsComments(groupId),
]
