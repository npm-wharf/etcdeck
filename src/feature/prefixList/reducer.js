import _ from 'lodash'
const assign = Object.assign

const initialState = {
  list: []
}

const actions = {
  prefixAdded: (state, { prefix }) => {
    const prefixes = state.list.slice()
    prefixes.push(prefix)
    return assign({}, state, { list: prefixes })
  },
  prefixesListed: (state, { prefixes }) => {
    return assign({}, state, {
      list: prefixes
    })
  },
  prefixRemoved: (state, { prefix }) => {
    const prefixes = _.without(state.list.slice(), prefix)
    return assign({}, state, { list: prefixes })
  }
}

export default function reducer (state = initialState, action) {
  let fn = actions[ action.type ]
  if (fn) {
    return fn(state, action)
  } else {
    return state
  }
}
