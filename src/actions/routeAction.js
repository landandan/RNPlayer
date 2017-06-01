/**
 * @flow
 */

type Route = {
  routeName: string,
}
export function pushOrPopToRoute(route: Route | Array<Route>) {
  return {
    type: 'PUSH_OR_POP_TO_ROUTE',
    route,
  }
}

export function popRoute(route: ?Route) {
  return {
    type: 'POP_ROUTE',
  }
}
