import { createPrefix } from './api'

export function addPrefix (prefix) {
  return function (dispatch) {
    createPrefix(prefix)
      .then(
        x => {
          if (x) {
            dispatch(getAddition(prefix))
            dispatch(getClear())
          }
        }
      )
  }
}

export function changePrefix (prefix) {
  return function (dispatch) {
    dispatch({ type: 'prefixChanged', prefix: prefix })
  }
}

export function clearPrefix () {
  return function (dispatch) {
    dispatch(getClear())
  }
}

function getAddition (prefix) {
  return { type: 'prefixAdded', prefix: prefix }
}

function getClear () {
  return { type: 'prefixChanged', prefix: '' }
}
