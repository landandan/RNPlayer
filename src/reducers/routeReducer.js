/**
 * @flow
 */
import { NavigationActions } from 'react-navigation'
import { AppNavigator } from '../utils/AppNavigator'

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Root')
const initialNavState = AppNavigator.router.getStateForAction(firstAction)

function route(state = initialNavState, action = {}) {
  let nextState
  switch (action.type) {
  case 'POP_ROUTE':
    nextState = AppNavigator.router.getStateForAction(NavigationActions.back(), state)
    break
  case 'PUSH_OR_POP_TO_ROUTE':
    nextState = AppNavigator.router.getStateForAction(NavigationActions.navigate(action.route), state)
    break
    // default:
    //   nextState = AppNavigator.router.getStateForAction(action, state);
    //   break;
  }
  // Simply return the original `state` if `nextState` is null or undefined.
  // console.log('nextState:', nextState)
  // console.log('state:', state)
  return nextState || state
}

export default route
