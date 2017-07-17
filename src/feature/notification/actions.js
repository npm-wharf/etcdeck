const assign = Object.assign
import uuid from 'uuid'

const notificationDefaults = {
  dismissable: true,
  duration: 15000,
  level: 'info',
  fadeDirection: 'fade-in'
}

export function onConnectionFailure (dispatch) {
  dispatch(notify({ header: 'Oops', body: 'Could not connect to server :(', level: 'danger' }))
}

export function onAPIError (dispatch) {
  dispatch(notify({ header: "We're Sorry", body: 'A problem occurred processing your request', level: 'danger' }))
}

export function dismissNotification (id) {
  return { type: 'dismissed', id: id }
}

export function notify (notification) {
  let message = assign({ id: uuid.v4() }, notificationDefaults, notification)
  return function send(dispatch) {
    dispatch({ type: "notify", message: message })
    if (message.duration && message.duration > 0) {
      setTimeout(() => {
        dispatch({ type: "dismiss", id: message.id })
        setTimeout(() => {
          dispatch(dismissNotification( message.id ))
        }, 500)
      }, message.duration)
    }
  }
}
