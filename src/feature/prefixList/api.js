
export function getPrefixes () {
  return fetch('/api/key', {
    method: 'get',
    headers: {
      'accept': 'application/json'
    }
  })
  .then(
    resp => {
      if (resp.status === 200) {
        return resp
          .json()
          .then(list => (list.map(x => /^[/]/.test(x) ? x.slice(1) : x)).sort())
      } else {
        return undefined
      }
    }
  )
}

export function getPrefixKeys (prefix) {
  return fetch(`/api/key/${prefix}`, {
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
