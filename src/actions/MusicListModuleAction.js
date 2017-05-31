/**
 * @flow
 */
import songList from '../utils/API/NeteaseCloudMusicApi/recommendSongList'
export default async function (songType: string) {
  const musicListData = await songList(songType)
  return {
    type: 'page/getMusicListData',
    musicListData,
  }
}