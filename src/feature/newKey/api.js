export function addKey (prefix, name, value) {
  return fetch(`/api/key/${prefix}/${name}`, {
    method: 'put',
    headers: {
      'content-type': 'text/plain'
    },
    body: value
  })
  .then(
    resp => {
      console.log(resp)
      if (resp.status >= 200 < 300) {
        return true
      } else {
        return false
      }
    }
  )
}
