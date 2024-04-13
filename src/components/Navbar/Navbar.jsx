import React, { useState } from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets';
import {Link} from 'react-router-dom';

const Navbar = () => {

    const [menu,setMenu]=useState('hone');
  return (
    <div className='navbar'>
    <img src={assets.logo} alt='' className='logo'></img>
    <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu('home')} className={menu==="home"?"active":""}>Home</Link>
        <a  href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#appdownload' onClick={()=>setMenu('mobile-app')} className={menu==="mobile-app"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu('contact')} className={menu==="contact"?"active":""}>Contact us</a>
    </ul>
    <div className='navbar-right'>
        <img src={assets.search_icon} alt=''></img>
        <div className='navbar-search-icon'>
            <img src={assets.basket_icon} alt=''></img>
            <div className='dot'></div>
        </div>
        <button>Sign in</button>
    </div>
      
    </div>
  )
}

export default Navbar
