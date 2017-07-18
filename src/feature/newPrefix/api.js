
export function createPrefix (prefix) {
  return fetch(`/api/key/${prefix}`, {
    method: 'put',
    headers: {
      'content-type': 'text/plain'
    },
    body: ''
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
