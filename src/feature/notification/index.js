import React from 'react'
import { connect } from 'react-redux'
import { dismissNotification } from './actions'

const NotificationView = ({ userName, messages, dismiss }) => {
  var list = messages.map((message) => {
    var displayStyle = [
      'alert',
      'alert-' + message.level,
      message.fadeDirection,
      message.dismissable ? 'alert-dismissable' : ''
    ].join(' ')
    var dismissButton = message.dismissable
      ? (<i className='fa fa-times' onClick={(e) => {
        dismiss(message.id)
      }}>&nbsp;</i>) : <span />
    return <li>
      <div className={displayStyle}>
        <b>{message.header ? message.header + ': ' : ''}</b>
        <span>{message.body}&nbsp;</span>
        {dismissButton}
      </div>
    </li>
  })

  return (
    <ul className='list-unstyled'>
      {list}
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
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
