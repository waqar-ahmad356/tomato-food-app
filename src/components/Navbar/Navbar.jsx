
import React from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
    <img src={assets.logo} alt='logo' className='logo'></img>
    <img src={assets.profile_image} alt='profile' className='profile'></img>
      
    </div>
  )
}

export default Navbar