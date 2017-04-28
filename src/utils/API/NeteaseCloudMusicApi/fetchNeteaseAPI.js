/**
 * @flow
 */
import { fetchAPI } from "../../Common";

export const neteaseAPIParams = {
  cookie: '',
}

export default async function (url: string, params: Object) {
  return fetch(url, {
    headers: {
      'Accept': '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': 'http://music.163.com',
      'Host': 'music.163.com',
      'Cookie': neteaseAPIParams.cookie,
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
    },
    ...params,
  })
}

export async function fetchMacNeteaseCloudAPI(url: string, params: Object) {
  return await fetchAPI(url, {
    method: 'POST',
    headers: {
      'Host': 'music.163.com',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    mode: "cors",
    ...params,
  })
}