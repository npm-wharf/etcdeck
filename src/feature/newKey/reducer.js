const assign = Object.assign

const initialState = {
  name: '',
  value: '',
  canAdd: false
}

const actions = {
  nameChanged: (state, { name }) => {
    return assign({}, state, { name: name, canAdd: name.length > 0 && state.value.length > 0 })
  },
  newKeyCleared: (state) => {
    return assign({}, state, { name: '', value: '', canAdd: false })
  },
  valueChanged: (state, { value }) => {
    return assign({}, state, { value: value, canAdd: value.length > 0 && state.name.length > 0 })
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
