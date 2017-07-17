import React from 'react'
import './style.css'

const Key = ( {prefix, name, value, changeKeyDisplay, updateKey} ) => {
  let controlValue
  const count = value.toString().length
  let width = count - (count * .04)
  width = width < 1 ? 1 : width
  return (<div className="field">
      <label className="field-label" htmlFor={name}>{name}</label>
      <input 
        ref={ x => controlValue = x }
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
            if(e.target.changed) {
               updateKey(prefix, name, controlValue.value)
               e.target.changed = false
            }
          }
        }
      />
  </div>)
}

export default Key