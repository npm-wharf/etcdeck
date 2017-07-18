import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import nav from './nav'

import newKey from './feature/newKey/reducer'
import newPrefix from './feature/newPrefix/reducer'
import prefixes from './feature/prefixList/reducer'
import keySet from './feature/keySet/reducer'

export default function Reducer (history) {
  return combineReducers({
    keySet: keySet,
    nav: nav(history),
    newKey: newKey,
    newPrefix: newPrefix,
    prefixes: prefixes,
    routing: routerReducer
  })
}