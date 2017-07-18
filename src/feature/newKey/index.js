import React from 'react'
import './style.css'
import { connect } from 'react-redux'
import { addKeyValue, changeName, changeValue, clearNewKey } from './actions'

const NewKeyView = ({ name, value, location, canAdd, changeName, changeValue, clear, add }) => {
  let nameControl
  let valueControl
  const minWidth = 6
  const nameCount = name.toString().length
  const valueCount = value.toString().length
  const nameWidth = nameCount < minWidth ? minWidth : nameCount
  const valueWidth = valueCount < minWidth ? minWidth : valueCount
  const prefix = location.pathname.split('/')[2]
  return (<div className='field'>
    <section className='field-set'>
      <label className='field-label' htmlFor='prefix'>key name</label>
      <input
        ref={x => { nameControl = x }}
        size={nameWidth}
        value={name}
        onChange={
          (e) => changeName(e.target.value)
        }
      />
    </section>
    <section className='field-set'>
      <label className='field-label' htmlFor='prefix'>key value</label>
      <input
        ref={x => { valueControl = x }}
        size={valueWidth}
        value={value}
        onChange={
          (e) => changeValue(e.target.value)
        }
      />
    </section>
    <div className='field-buttons'>
      <button
        className='btn btn-default btn-sm'
        disabled={!canAdd}
        onClick={
          (e) => {
            e.preventDefault()
            add(prefix, nameControl.value, valueControl.value)
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
    name: state.newKey.name,
    value: state.newKey.value,
    canAdd: state.newKey.canAdd,
    location: state.routing.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (prefix, name, value) => dispatch(addKeyValue(prefix, name, value)),
    changeName: (name) => dispatch(changeName(name)),
    changeValue: (value) => dispatch(changeValue(value)),
    clear: () => dispatch(clearNewKey())
  }
}

const NewKey = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewKeyView)

export default NewKey
