/**
 * @flow
 */
import fetchNeteaseAPI from './fetchNeteaseAPI'

export default async function () {
  return fetchNeteaseAPI('/recommend/resource', {
    method: 'POST',
  })
}
