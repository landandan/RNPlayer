/**
 * @flow
 */

export function startLoading() {
  return {
    type: 'app/startLoading',
  }
}

export function finishLoading() {
  return {
    type: 'app/finishLoading',
  }
}
export function disableLoading() {
  return {
    type: 'app/disableLoading',
  }
}

export function enableLoading() {
  return {
    type: 'app/enableLoading',
  }
}

export function disableLoadingAction(action:any) {
  const disableLoad:any = disableLoading()
  return [disableLoad, async (state:any) => {
    try {
      return [await action(state), enableLoading]
    } catch (e) {
      return [e, enableLoading]
    }
  }]
}
