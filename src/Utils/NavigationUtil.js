/**
 * NavigationUtil.js
 */
import {StackActions, NavigationActions} from 'react-navigation';

export function reset(navigation, routeName) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: routeName})],
  });
  navigation.dispatch(resetAction);
}
// export function replace(navigation, routeName) {
//   const popAction = StackActions.replace({
//     key:routeName,
//   });
//   navigation.dispatch(popAction);
// }

export function push(navigation, routeName, params) {
  const pushAction = StackActions.push({
    routeName: routeName,
    params: params,
  });
  navigation.dispatch(pushAction);
}
export function pop(navigation) {
  const popAction = StackActions.pop({
    n: 1,
  });
  navigation.dispatch(popAction);
}
export function popToTop(navigation) {
  navigation.dispatch(StackActions.popToTop());
}

// export function setParams(navigation, params) {
//   const resetAction = NavigationActions.setParams({
//     params: params,
//   });
//   navigation.dispatch(resetAction);
// }

// export default reset;
