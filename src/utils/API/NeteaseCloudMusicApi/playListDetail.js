/**
 * @flow
 */
import fetchNeteaseAPI from "./fetchNeteaseAPI"

export default async function(id: string) {
  return fetchNeteaseAPI('/playlist/detail?id=' + id)
}