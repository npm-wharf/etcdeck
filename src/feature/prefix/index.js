import React from 'react'
import './style.css'
import { Link } from "react-router-dom"

const Prefix = ({name, location}) => {
  const url = `/prefix/${name}`
  const classes = `nav-item ${location.pathname === url ? 'active' : ''}`
  return (<li className={classes}>
    <Link to={url} className='nav-link'>
      {name}
    </Link>
  </li>)
}

export default Prefix