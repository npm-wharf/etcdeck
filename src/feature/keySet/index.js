import './style.css'
import React from 'react'
import _ from 'lodash'
import Key from '../key'
import NewKey from '../newKey'
import { connect } from 'react-redux'
import { deleteKeyCommand, setKeyCommand, changeKeyDisplayCommand } from './actions'

const KeySetView = ({ sets, location, deleteKey, changeKeyDisplay, updateKey }) => {
  const prefix = location.pathname.split('/')[2]
  const list = _.map(sets[ prefix ], (v, k) => {
    const path = `${prefix}/${k}`
    return (<Key
      prefix={prefix}
      name={k}
      value={v}
      key={path}
      deleteKey={deleteKey}
      changeKeyDisplay={changeKeyDisplay}
      updateKey={updateKey}
    />)
  })
  return (
    <div>
      <NewKey />
      <hr />
      {list}
    </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    sets: state.keySet.sets,
    location: state.routing.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeKeyDisplay: (prefix, key, value) => dispatch(changeKeyDisplayCommand(prefix, key, value)),
    deleteKey: (prefix, key) => dispatch(deleteKeyCommand(prefix, key)),
    updateKey: (prefix, key, value) => dispatch(setKeyCommand(prefix, key, value))
  }
}

const KeySet = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeySetView)

export default KeySet
