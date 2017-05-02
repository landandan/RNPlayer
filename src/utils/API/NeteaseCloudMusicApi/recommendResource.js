/**
 * @flow
 */
import fetchNeteaseAPI from "./fetchNeteaseAPI"

export default async function() {
  return fetchNeteaseAPI('https://music.163.com/weapi/v1/discovery/recommend/resource', {
    method: 'POST',
  })
}