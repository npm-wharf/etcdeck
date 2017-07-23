
import { getPrefixKeys } from './api'

export function getKeySet (prefix) {
  return function getKeys (dispatch) {
    return getPrefixKeys(prefix)
      .then(
        set => dispatch(keySetFetched(prefix, set))
      )
  }
}

function keySetFetched (prefix, set) {
  return { type: 'keySetFetched', prefix: prefix, keySet: set }
}
