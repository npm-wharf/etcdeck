import _ from 'lodash'
const assign = Object.assign

const initialState = {
  prefix: '',
  canAdd: false
}

const actions = {
  prefixChanged: (state, { prefix }) => {
    return assign({}, state, { prefix: prefix, canAdd: prefix.length > 0 })
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