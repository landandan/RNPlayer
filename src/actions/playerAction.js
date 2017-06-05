/**
 * @flow
 */
import _ from 'lodash'
import searchMusic from '../utils/API/QQMusic/search'
import { getMusicLrc, getMusicUrlById } from '../utils/API/NeteaseCloudMusicApi/fetchNeteaseNode'

export function setPlayMusicList(playMusicList: Array<Object>) {
  return {
    type: 'setPlayMusicList',
    playMusicList,
  }
}

export function setCurrentMusicInfo(musicInfo: Object) {
  return (store) => {
    const { player = {} } = store || {}
    const { musicList = [] } = player
    const newMusicList = []
    musicList.forEach((item, index) => {
      if (item.id === musicInfo.id) {
        newMusicList.push({...item, active: true})
      } else {
        newMusicList.push({...item, active: false})
      }
    })
    return [
      setPlayMusicList(newMusicList),
      {
      type: 'setCurrentMusicInfo',
      musicInfo,
    }, setCurrentMusicLrc(musicInfo.id)]
  }
}

export async function setSearchResultList(keywords: string) {
  const result = await searchMusic(keywords)
  const searchResultList = result.data.song.list
  return {
    type: 'setSearchResultList',
    searchResultList,
  }
}

export const cyclicalPatterns = ['repeat', 'repeatOne', 'shuffle']

export const changeCyclicalPattern = () => {
  return (store) => {
    const { player: { status: { cyclicalPattern } } } = store
    let newCyclicalPattern
    for(let i = 0; i < cyclicalPatterns.length; i ++){
      if(cyclicalPatterns[i] === cyclicalPattern && i < cyclicalPatterns.length - 1){
        newCyclicalPattern = cyclicalPatterns[i + 1]
      }
      if(cyclicalPatterns[i] === cyclicalPattern && i == cyclicalPatterns.length - 1){
        newCyclicalPattern = cyclicalPatterns[0]
      }
    }
    return setPlayerStatus({
      cyclicalPattern: newCyclicalPattern,
    })
  }
}

export function setPlayerStatus(status: Object) {
  return {
    type: 'setPlayerStatus',
    status,
  }
}

export async function playFindMusic(musicInfo: Object) {
  const musicUrlResult = await getMusicUrlById(musicInfo.id)
  const musicUrl = _.find(musicUrlResult.data, { id: musicInfo.id })
  const newCurrentMusicInfo = {
    ...musicInfo,
    mp3Url: musicUrl.url,
    //fileSrc: `http://ws.stream.qqmusic.qq.com/${musicInfo.id}.m4a?fromtag=46`,
  }
  return [
    setCurrentMusicInfo(newCurrentMusicInfo),
    addSongToMusicList(newCurrentMusicInfo),
    setPlayerStatus({
      paused: false,
    })]
}

export function addSongToMusicList(musicInfo: Object) {
  return (store) => {
    const { player = {} } = store || {}
    const { musicList = [] } = player
    let flag = true
    _.forEach(musicList, (v) => {
      if (v.id == musicInfo.id) {
        flag = false
      }
    })
    let newMusicList = musicList.concat([])
    if (flag) {
      newMusicList = musicList.concat([musicInfo])
    }
    return setPlayMusicList(newMusicList)
  }
}

export function playMusicList(id: number) {
  return async (store) => {
    let newCurrentMusicInfo = {}
    const { player = {} } = store || {}
    const { musicList = [] } = player
    musicList.forEach((item, index) => {
      if (item.id === id) {
        newCurrentMusicInfo = item
      }
    })
    return [
      setCurrentMusicInfo(newCurrentMusicInfo),
      setPlayerStatus({
        paused: false,
      })]
  }
}

export function playMusicListNext() {
  return async (store) => {
    let newCurrentMusicInfo = {}
    const { player = {} } = store || {}
    const { musicList = [], currentMusicInfo = {}, status = {} } = player
    if(status.cyclicalPattern === 'repeat'){  //  循环
      for (let i = 0; i < musicList.length; i++) {
        if (musicList[i].id === currentMusicInfo.id) {
          newCurrentMusicInfo = musicList[i + 1] || musicList[0]
        }
      }
    }
    if(status.cyclicalPattern === 'shuffle'){  // 随机
      const randomNum = _.random(musicList.length)
      if(musicList[randomNum].id !== currentMusicInfo.id ){
        newCurrentMusicInfo = musicList[randomNum]
      } else {
        return [playMusicListNext()]
      }
    }
    return [
      setCurrentMusicInfo(newCurrentMusicInfo),
      setPlayerStatus({
        paused: false,
      })]
  }
}

export function playMusicListPre() {
  return async (store) => {
    let newCurrentMusicInfo = {}
    const { player = {} } = store || {}
    const { musicList = [], currentMusicInfo = {} } = player
    for (let i = 0; i < musicList.length; i++) {
      if (musicList[i].id === currentMusicInfo.id) {
        newCurrentMusicInfo = musicList[i - 1] || musicList[musicList.length - 1]
      }
    }

    return [
      setCurrentMusicInfo(newCurrentMusicInfo),
      setPlayerStatus({
        paused: false,
      })]
  }
}

export function pausedChange() {
  return (store) => {
    const { player = {} } = store || {}
    const { status } = player
    return setPlayerStatus({
      paused: !status.paused,
    })
  }
}

export function mutedChange() {
  return (store) => {
    const { player = {} } = store || {}
    const { status } = player
    return setPlayerStatus({
      muted: !status.muted,
    })
  }
}

export function volumeChange(value: number) {
  return setPlayerStatus({
    volume: value,
  })
}

export function setCurrentMusicDuration(value: number) {
  return setPlayerStatus({
    duration: value,
  })
}

export function setMusicCurrentTime(value: number) {
  return setPlayerStatus({
    currentTime: value,
  })
}

export async function setCurrentMusicLrc(id: string) {
  const musicLrc = await getMusicLrc(id)
  return {
    type: 'setCurrentMusicLrc',
    musicLrc,
  }
}
