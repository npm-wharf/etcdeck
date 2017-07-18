import { addKey } from './api'

export function addKeyValue (prefix, name, value) {
  return function (dispatch) {
    addKey(prefix, name, value)
      .then(
        x => {
          if (x) {
            dispatch(getAddition(prefix, name, value))
            dispatch(getClear())
          }
        }
      )
  }
}

export function changeName (name) {
  return function (dispatch) {
    dispatch({ type: 'nameChanged', name: name })
  }
}

export function changeValue (value) {
  return function (dispatch) {
    dispatch({ type: 'valueChanged', value: value })
  }
}

export function clearNewKey () {
  return function (dispatch) {
    dispatch(getClear())
  }
}

function getAddition (prefix, name, value) {
  return { type: 'keySet', prefix: prefix, key: name, value: value }
}

function getClear () {
  return { type: 'newKeyCleared' }
}
