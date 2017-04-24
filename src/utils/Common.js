/**
 * @flow
 */

export function transformTime(seconds) {
  let m, s;
  m = Math.floor(seconds / 60)
  m = m.toString().length == 1 ? ('0' + m) : m
  s = Math.floor(seconds - 60 * m)
  s = s.toString().length == 1 ? ('0' + s) : s
  return m + ':' + s
}