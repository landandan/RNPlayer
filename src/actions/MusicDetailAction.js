/**
 * @flow
 */
import { getMusicDetail, getSongDetailById } from '../utils/API/NeteaseCloudMusicApi/fetchNeteaseNode'
import { playFindMusic } from './playerAction'

export default async function getMusicListDetail(id: string) {
  const MusicDetailMsg = await getMusicDetail(id)
  return {
    type:'page/getMusicListDetail',
    MusicDetailMsg,
  }
}

export async function getSongDetail(id: string) {
  console.log('id:', id)
  const songDetail = await getSongDetailById(id)
  console.log('songDetail:', songDetail.songs[0])
  return playFindMusic(songDetail.songs[0])
}