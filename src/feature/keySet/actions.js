import { onAPIError, noice } from '../notification/actions'
import { setKey, removeKey } from './api'

export function changeKeyDisplayCommand (prefix, key, value) {
  return function changeDisplay (dispatch) {
    dispatch(keySet(prefix, key, value))
  }
}

export function deleteKeyCommand (prefix, key) {
  return function sendSetKey (dispatch) {
    removeKey(prefix, key)
      .then(
        x => {
          if (x) {
            dispatch(keyDeleted(prefix, key))
          } else {
            onAPIError(dispatch)
          }
        }
      )
  }
}

export function setKeyCommand (prefix, key, value) {
  return function sendSetKey (dispatch) {
    setKey(prefix, key, value)
      .then(x => {
        if (x) {
          dispatch(keySet(prefix, key, value))
        } else {
          onAPIError(dispatch)
        }
      })
  }
}

function keyDeleted (prefix, key) {
  return { type: 'keyDeleted', prefix: prefix, key: key }
}

function keySet (prefix, key, value) {
  return { type: 'keySet', prefix: prefix, key: key, value: value }
}
