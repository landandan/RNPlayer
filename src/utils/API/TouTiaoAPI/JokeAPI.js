/**
 * @flow
 */
import { fetchAPI } from "../../Common"
import CryptoJS from 'crypto-js'

const getHoney = function() {
  const t = Math.floor((new Date).getTime() / 1e3)
    , e = t.toString(16).toUpperCase()
    , i = CryptoJS.MD5(t.toString()).toString().toUpperCase();
  if (8 != e.length)
    return {
      as: "479BB4B7254C150",
      cp: "7E0AC8874BB0985"
    };
  for (var n = i.slice(0, 5), a = i.slice(-5), s = "", o = 0; 5 > o; o++)
    s += n[o] + e[o];
  for (var r = "", c = 0; 5 > c; c++)
    r += e[c + 3] + a[c];
  return {
    as: "A1" + s + e.slice(-3),
    cp: e.slice(0, 3) + r + "E1"
  }
}

export async function getJokeFormTouTiao () {
  const params = getHoney()
  const url = [
    'http://www.toutiao.com/api/article/feed/',
    '?category=essay_joke&utm_source=toutiao&widen=1',
    '&max_behot_time=0&max_behot_time_tmp=0',
    '&tadrequire=true',
    '&as=' + params.as,
    '&cp=' + params.cp,
  ].join('')
  return await fetchAPI(url, {
    method: 'GET',
  })
}