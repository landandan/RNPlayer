/**
 * @flow
 */
import getMacNeteaseCloudHome from '../utils/API/NeteaseCloudMusicApi/macNeteaseCloudHome'

export async function setNETSHomeData() {
  const NETSHomeData = await getMacNeteaseCloudHome()
  const hotspot = NETSHomeData['/api/discovery/hotspot'].data
  const newSongs = NETSHomeData['/api/v1/discovery/new/songs'].data
  const banners = NETSHomeData['/api/v2/banner/get'].banners
  return {
    type: 'setNETSHomeData',
    NETSHomeData: {
      hotspot,
      newSongs,
      banners,
    },
  }
}

export function setHomeFooterTabActive(active: string) {
  return {
    type: 'setHomeFooterTabActive',
    active,
  }
}
