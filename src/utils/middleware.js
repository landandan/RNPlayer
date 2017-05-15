/**
 * @flow
 */
import _ from 'lodash'
import { applyMiddleware } from 'redux'
import { startLoading, finishLoading } from "../actions/loading"

function multiDispatcher({ dispatch }) {
  return next => actions => {
    if ( _.isArray(actions) ) {
      return actions.map(action => dispatch(action))
    }
    return next(actions)
  }
}

function promise({ dispatch }) {
  return next => action => {
    if ( action && typeof action.then === 'function' ) {
      dispatch(startLoading())
      const finishLoadingAndDispatch = (input) => {
        try {
          dispatch(finishLoading())
          dispatch(input)
        } catch (e) {
          console.log('error:', e)
        }
      }
      return action.then(finishLoadingAndDispatch).catch(finishLoadingAndDispatch)
    }
    return next(action)
  }
}

function thunkState({ dispatch, getState }) {
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

const filterNil = () => (next) => (action) => {
  if ( action != null ) {
    next(action)
  }
}

export default applyMiddleware(
  multiDispatcher,
  promise,
  thunkState,
  filterNil
)