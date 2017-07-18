import React from 'react'
import './style.css'

const Key = ({prefix, name, value, deleteKey, changeKeyDisplay, updateKey}) => {
  let controlValue
  const count = value.toString().length
  let width = count < 1 ? 1 : count
  return (<div className='field'>
    <i
      className='fa fa-times delete'
      onClick={
        (e) => {
          e.preventDefault()
          deleteKey(prefix, name)
        }
      }
    >&nbsp;</i>
    <label className='field-label' htmlFor={name}>{name}</label>
    <input
      ref={x => { controlValue = x }}
      value={value}
      size={width}
      onChange={
        (e) => {
          e.target.changed = true
          changeKeyDisplay(prefix, name, e.target.value)
        }
      }
      onBlur={
        (e) => {
          if (e.target.changed) {
            updateKey(prefix, name, controlValue.value)
            e.target.changed = false
          }
        }
      }
    />
  </div>)
}

export default Key
