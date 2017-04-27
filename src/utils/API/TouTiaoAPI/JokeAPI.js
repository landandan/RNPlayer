/**
 * @flow
 */
import { fetchAPI } from "../../Common";

export async function getJokeFormTouTiao (jokeInfo:{
  minBeHotTime: string,
}) {
  const url = ['http://is.snssdk.com/api/news/feed/v51/?',
    'category=essay_joke&refer=1&count=20',
    '&min_behot_time=' + jokeInfo.minBeHotTime].join('')
  return await fetchAPI(url, {
    method: 'GET',
  })
}