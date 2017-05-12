/**
 * @flow
 */
import { startLoading, finishLoading } from "../actions/loading"

export function multiDispatcher({ dispatch }) {
  return next => actions => {
    if ( Array.isArray(actions) ) {
      return actions.map(action => dispatch(action))
    }
    return next(actions)
  }
}

export function promise({ dispatch }) {
  return next => action => {
    if ( action && typeof action.then === 'function' ) {
      dispatch(startLoading())
      const finishLoadingAndDispatch = (input) => {
        dispatch(finishLoading())
        dispatch(input)
      }
      return action.then(finishLoadingAndDispatch).catch(finishLoadingAndDispatch)
    }
    return next(action)
  }
}

export function thunkState({ dispatch, getState }) {
  return next => action => {
    try {
      if ( getState().loading.loadingQueue.length <= 0 ) {
        dispatch(finishLoading())
      }
    } catch (e) {
      dispatch(finishLoading())
    }
    if ( action && typeof action === 'function' ) {
      return dispatch(action(getState()))
    }
    return next(action)
  }
}