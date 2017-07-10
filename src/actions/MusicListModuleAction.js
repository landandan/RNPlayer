/**
 * @flow
 */
import songList from '../utils/API/NeteaseCloudMusicApi/recommendSongList'

export const setCurrentMusicListType = (musicListType: string) => ({
  type: 'page/setCurrentMusicListType',
  musicListType,
})

export const recordMusicId = (id: string) => ({
  type: 'page/recordMusicId',
  id,
})

export default function (musicListType: string) {
  return [
    setCurrentMusicListType(musicListType),
    getMusicListData(musicListType),
  ]
}

export async function getMusicListData(songType: string) {
  const musicListData = await songList(songType)
  return [{
    type: 'page/getMusicListData',
    musicListData,
  }]
}
