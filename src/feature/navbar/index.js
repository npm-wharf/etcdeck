import './style.css'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
      <ul className='nav nav-tabs'>
        <li role='presentation'>
          <Link to='/' className='image-link nav-link'>
            <img className='menu-image' src='/images/etcd.png' alt='etcd' />
            Keys
          </Link>
        </li>
        <li role='presentation'>
          <Link to='/add-prefix' className='text-link nav-link'>
            <i className='fa fa-plus fa-2x'>&nbsp;</i>
            Add Prefix
          </Link>
        </li>
        <li role='presentation'>
          <Link to='/about' className='text-link  nav-link'>
            <i className='fa fa-question fa-2x'>&nbsp;</i>
            About This Project
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
