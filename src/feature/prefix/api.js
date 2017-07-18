
export function getPrefixKeys (prefix) {
  return fetch(`api/key/${prefix}`, {
    method: 'get',
    headers: {
      'accept': 'application/json'
    }
  })
  .then(
    resp => {
      if (resp.status === 200) {
        return resp.json()
      } else {
        return undefined
      }
    }
  )
}
