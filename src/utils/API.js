/**
 * @flow
 */

export async function getMusicList() {
  try {
    let result
    const url = 'http://rapapi.org/mockjsdata/16978/rn_songList'
    await fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        result = responseJSON
      })
    return result || {}
  } catch (error) {
    console.error(error)
  }
}

export async function getMusicLrc(songId: string) {
  try {
    let result
    let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting?method=baidu.ting.song.lry&songid=' + songId
    await fetch(url).then((response) => response.json())
      .then((responseJSON) => {
        result = responseJSON
      })
    return result || {}
  } catch (error) {
    console.error(error)
  }
}

export async function searchMusic(keywords: string) {
  try {
    let result
    const n = '100'
    const url = encodeURI('http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=' +
      n + '&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=' + keywords);
    await fetch(url).then((response) => response.json())
      .then((responseJSON) => {
        result = responseJSON
      })
    //console.log('result:', result)
    return result || {}
  } catch (error) {
    console.error(error)
  }
}