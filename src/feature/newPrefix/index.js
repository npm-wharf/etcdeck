import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import { changePrefix, clearPrefix, addPrefix } from './actions'

const NewPrefixView = ({ prefix, canAdd, change, clear, add }) => {
  let inputControl
  const count = prefix.toString().length
  let width = count
  width = width < 20 ? 20 : width
  return (<div className='field'>
    <label className='field-label' htmlFor='prefix'>Prefix</label>
    <input
      className='small-field'
      ref={x => { inputControl = x }}
      size={width}
      value={prefix}
      onChange={
        (e) => change(e.target.value)
      }
    />
    <div className='field-buttons'>
      <button
        className='btn btn-default btn-sm'
        disabled={!canAdd}
        onClick={
          (e) => {
            e.preventDefault()
            add(inputControl.value)
          }
        }
      >add</button>
      <button
        className='btn btn-default btn-sm'
        disabled={!canAdd}
        onClick={
          (e) => {
            e.preventDefault()
            clear()
          }
        }
      >reset</button>
    </div>
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    prefix: state.newPrefix.prefix,
    canAdd: state.newPrefix.canAdd
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (prefix) => dispatch(addPrefix(prefix)),
    change: (prefix) => dispatch(changePrefix(prefix)),
    clear: () => dispatch(clearPrefix())
  }
}

const NewPrefix = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPrefixView)

export default NewPrefix
