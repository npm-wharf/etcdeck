import _ from 'lodash'
const assign = Object.assign

const initialState = {
  sets: {
    test1: {
      a: 1,
      b: 'https://localhost:8080/registry/_attachments/lol',
      c: 3,
      d: 4,
      e: 5,
      f: 6
    },
    test2: {
      a: 'ah',
      b: 'bae',
      c: 'tsae',
      d: 'dae',
      e: 'ea',
      f: 'eff'
    }
  }
}

const actions = {
  keyDeleted: (state, { prefix, key }) => {
    const set = state.sets[ prefix ]
    delete set[ key ]
    const sets = state.sets
    sets[ prefix ] = set
    return assign({}, state, { sets: sets })
  },
  keySet: (state, { prefix, key, value }) => {
    const set = _.cloneDeep(state.sets[ prefix ])
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
};

export default function reducer( state = initialState, action ) {
  let fn = actions[ action.type ];
  if( fn ) {
    return fn( state, action );
  } else {
    return state;
  }
}