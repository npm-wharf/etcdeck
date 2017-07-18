import _ from 'lodash'
const assign = Object.assign

const initialState = {
  sets: {
  }
}

const actions = {
  keyDeleted: (state, { prefix, key }) => {
    const set = _.cloneDeep(state.sets[ prefix ])
    delete set[ key ]
    const sets = _.cloneDeep(state.sets)
    sets[ prefix ] = set
    return assign({}, state, { sets: sets })
  },
  keySet: (state, { prefix, key, value }) => {
    const set = _.cloneDeep(state.sets[ prefix ] || {})
    set[ key ] = value
    const sets = _.cloneDeep(state.sets)
    sets[ prefix ] = set
    return assign({}, state, { sets: sets })
  },
  keySetFetched: (state, { prefix, keySet }) => {
    const set = {}
    set[ prefix ] = keySet
    return assign({}, state, { sets: set })
  },
  prefixRemoved: (state, { prefix }) => {
    const sets = _.cloneDeep(state.sets)
    delete sets[ prefix ]
    return assign({}, state, { sets: sets })
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
