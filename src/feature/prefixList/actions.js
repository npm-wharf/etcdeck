
import { getPrefixes, getPrefixKeys } from './api'

export function getKeySet (prefix) {
  return function getKeys (dispatch) {
    return getPrefixKeys(prefix)
      .then(
        set => dispatch(keySetFetched(prefix, set))
      )
  }
}

export function listPrefixes () {
  return function getPrefixList (dispatch) {
    return getPrefixes()
      .then( 
        list => dispatch(prefixesListed(list))
      )
  }
}

function keySetFetched (prefix, set) {
  return { type: 'keySetFetched', prefix: prefix, keySet: set }
}

function prefixesListed( list ) {
  return { type: 'prefixesListed', prefixes: list }
}