import _ from 'lodash'
const assign = Object.assign

const initialState = {
  messages: []
}

const actions = {
  notify: (state, notification) => {
    let messages = state.messages.slice()
    messages.push(notification.message)
    return assign({}, state, { messages })
  },
  dismiss: (state, { id }) => {
    let messages = state.messages.slice()
    let message = _.find(messages, { id: id })
    if (message) {
      message.fadeDirection = 'fade-out'
      return assign({}, state, { messages })
    }
    return state
  },
  dismissed: (state, { id }) => {
    let messages = state.messages.slice()
    let newList = _.reject(messages, { id: id })
    return assign({}, state, { messages: newList })
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
