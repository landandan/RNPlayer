/**
 * @flow
 */
type loadingState = {
  loadingQueue: number,
  enableLoading: boolean,
}
const initialState = {
  loadingQueue: 0,
  enableLoading: true,
}

function loading(state: loadingState = initialState, action: Object) {
  if (action.type === 'app/startLoading') {
    return {
      ...state,
      loadingQueue: state.loadingQueue + 1,
    }
  }
  if (action.type === 'app/finishLoading') {
    return {
      ...state,
      loadingQueue: Math.max(0, state.loadingQueue - 1),
    }
  }
  if (action.type === 'app/disableLoading') {
    return {
      ...state,
      enableLoading: false,
    }
  }
  if (action.type === 'app/enableLoading') {
    return {
      ...state,
      enableLoading: true,
    }
  }
  return state
}

export default loading
