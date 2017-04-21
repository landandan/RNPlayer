/**
 * @flow
 */
import { getNTESHomeMusic } from "../utils/API"

export async function setNETSHomeData() {
  const NETSHomeData = await getNTESHomeMusic()
  const hotspot = NETSHomeData['/api/discovery/hotspot'].data
  const newSongs = NETSHomeData['/api/v1/discovery/new/songs'].data
  const banners = NETSHomeData['/api/v2/banner/get'].banners
  // console.log('NETSHomeData:', NETSHomeData)
  // console.log('hotspot:', hotspot)
  // console.log('newSongs:', newSongs)
  // console.log('banner:', banners)
  return {
    type: 'setNETSHomeData',
    NETSHomeData: {
      hotspot,
      newSongs,
      banners,
    },
  }
}