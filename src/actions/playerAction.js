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

export function setPlayerStatus(status: Object) {
  return {
    type: 'setPlayerStatus',
    status,
  }
}

export function playFindMusic(musicInfo: {
  songName: string,
  singer: string,
  fileSrc: string,
  imgSrc: string,
}) {
  const newCurrentMusicInfo = {
    ...musicInfo,
    fileSrc: `http://ws.stream.qqmusic.qq.com/${musicInfo.fileSrc}.m4a?fromtag=46`,
  }
  return [
    setCurrentMusicInfo(newCurrentMusicInfo),
    setPlayerStatus({
      paused: false,
    })]
}