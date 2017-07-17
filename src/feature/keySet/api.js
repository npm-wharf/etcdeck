export function setKey(prefix, name, value) {
  return fetch(`/api/key/${prefix}/${name}`, {
    method: 'put',
    headers: {
      'content-type': 'text/plain'
    },
    body: value
  })
  .then(
    resp => {
      if( resp.status === 200 ) {
        return true
      } else {
        return false
      }
    }
  )
}