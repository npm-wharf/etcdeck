export function setKey (prefix, name, value) {
  return fetch(`/api/key/${prefix}/${name}`, {
    method: 'put',
    headers: {
      'content-type': 'text/plain'
    },
    body: value
  })
  .then(
    resp => {
      if (resp.status >= 200 < 300) {
        return true
      } else {
        return false
      }
    }
  )
}

export function removeKey (prefix, name) {
  return fetch(`/api/key/${prefix}/${name}`, {
    method: 'delete',
    headers: {
      'content-type': 'text/plain'
    }
  })
  .then(
    resp => {
      if (resp.status >= 200 < 300) {
        return true
      } else {
        return false
      }
    }
  )
}
