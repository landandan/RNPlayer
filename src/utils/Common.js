/**
 * @flow
 */
import { timeout } from "./promise";

export function transformTime(seconds) {
  let m, s;
  m = Math.floor(seconds / 60)
  m = m.toString().length == 1 ? ('0' + m) : m
  s = Math.floor(seconds - 60 * m)
  s = s.toString().length == 1 ? ('0' + s) : s
  return m + ':' + s
}

export async function fetchAPI(url: string, params: Object) {
  let result
  const response = await timeout(180000)(fetch(url, params))
    .catch(() => {
      throw new Error('亲，您的网络连接失败，请重新尝试。')
    })
  try {
    result = await response.json()
    //console.log('result:', result)
    if ( !result ) {
      throw new Error('系统繁忙，请稍后再试。')
    }
  } catch (error) {
    //console.error(error)
    throw new Error('系统繁忙，请稍后再试。')
  }
  return result || {}
}

export type Reducer<S, A> = (state: S, action: A) => S
export type ResetableReducer = Reducer<Object, {type: string}>

export const reset = (
  actionType: string, defaultValue: Object = {}
) => (reducer: ResetableReducer):ResetableReducer => (state, action) => {
  if (action.type === actionType) {
    return reducer(defaultValue, action)
  }
  return reducer(state, action)
}