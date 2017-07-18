import React from 'react'
import { connect } from 'react-redux'
import NotificationView from '../../components/notification.jsx'
import { dismissNotification } from '../../app/actions'

const mapStateToProps = (state) => {
  let user = state.auth.user
  return {
    userName: user ? user.displayName : '',
    messages: state.notifications.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dismiss: notificationId => dispatch(dismissNotification(notificationId))
  }
}

const Notification = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationView)

export default Notification
