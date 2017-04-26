/*
 * @flow
 */

export const delay = (interval: number) => (promise: Promise<*>): Promise<*> => (
  new Promise((resolve, reject) => {
    promise.then((result) => {
      setTimeout(() => resolve(result), interval)
    }).catch((error) => {
      setTimeout(() => reject(error), interval)
    })
  })
)
export const timeout = (interval: number) => (promise: Promise<*>): Promise<*> => (
  Promise.race([
    delay(interval)(Promise.reject(new Error('请求超时，请稍后重试'))),
    promise,
  ])
)
