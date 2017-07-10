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

export async function getMusicUrlById(id: string) {
  return fetchNeteaseAPI(`/music/url?id=${id}`) || {}
}

export async function getMusicDetail(id: string) {
  return fetchNeteaseAPI('/playlist/detail?id=' + id) || {}
}

export async function getSongDetailById(id: string) {
  return fetchNeteaseAPI('/song/detail?ids=' + id) || {}
}