/**
 * @flow
 */

import { search } from '../utils/API/NeteaseCloudMusicApi/fetchNeteaseNode'

export async function searchNetease(keywords: string) {
  const result = await search(keywords)
  // console.log('result:', result)

  return [{
    type: 'setSearchHistory',
    keywords,
  }, {
    type: 'setSearchResult',
    searchResult: result.result,
  }]

  // return {
  //   type: 'setSearchResult',
  //   searchResult: result.result,
  // }
}


export function reset() {
  return {
    type: 'searchResult/reset',
  }
}
