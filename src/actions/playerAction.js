/**
 * @flow
 */
import { searchMusic } from "../utils/API"

export function setMusicList(musicList: Array<Object>) {
  return {
    type: 'setMusicList',
    musicList,
  }
}
export function setCurrentMusicInfo(musicInfo: Object) {
  return {
    type: 'setCurrentMusicInfo',
    musicInfo,
  }
}

export async function setSearchResultList(keywords: string) {
  const result = await searchMusic(keywords)
  const searchResultList = result.data.song.list
  return {
    type: 'setSearchResultList',
    searchResultList,
  }
}