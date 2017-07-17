import { setKey } from './api'

export function changeKeyDisplayCommand(prefix, key, value) {
  return function changeDisplay(dispatch) {
    console.log(`change ${prefix}/${key} to ${value}`)
    dispatch(keySet(prefix, key, value))
  }
}

export function setKeyCommand(prefix, key, value) {
  return function sendSetKey(dispatch) {
    setKey(prefix, key, value)
      .then(x => {
        if (x) {
          dispatch(keySet(prefix, key, value))
        }
      })
  } 
}

function keySet(prefix, key, value) {
 return { type: 'keySet', prefix: prefix, key: key, value: value } 
}
