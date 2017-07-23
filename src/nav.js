const actions = {
  navigateTo: (state, action) => {
    var navTo = action.path || state.nextPathname || '/home'
    state.history.push(navTo)
    return state
  }
}

export default function (history) {
  const initialState = { history }
  return function reducer (state = initialState, action) {
    var fn = actions[ action.type ]
    if (fn) {
      return fn(state, action)
    } else {
      return state
    }
  }
}
