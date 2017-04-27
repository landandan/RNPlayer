/**
 * @flow
 */
import { fetchAPI } from "../../Common"

export default async function (keywords: string) {
  const n = '100'
  const url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=' +
    n + '&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8' +
    '&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0' +
    '&remoteplace=sizer.newclient.next_song&w=' + keywords)
  return await fetchAPI(url)
}