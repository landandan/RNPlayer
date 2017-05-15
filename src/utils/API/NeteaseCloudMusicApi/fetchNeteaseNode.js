/**
 * @flow
 */
import fetchNeteaseAPI from "./fetchNeteaseAPI"

export async function search(keywords: string) {
  return fetchNeteaseAPI('/search?keywords=' + keywords) || {}
}


export async function getRecommendResource() {
  return fetchNeteaseAPI('/recommend/resource')
}

export async function getMusicLrc(id: string) {
  return fetchNeteaseAPI('/lyric?id=' + id) || {}
}