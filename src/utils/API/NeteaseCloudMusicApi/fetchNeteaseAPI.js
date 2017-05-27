/**
 * @flow
 */
import { fetchAPI } from "../../Common";

export const neteaseAPIParams = {
  cookie: '',
}

export default async function (url: string, params?: Object) {
  return await fetchAPI('https://rnplayer.leanapp.cn' + url, {
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