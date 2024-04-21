import React, { useContext, useState } from 'react'
import './Navbar.css';
import {assets} from '../../assets/assets';
import {Link, useNavigate} from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({setShowLogin}) => {
  const navigate=useNavigate();

    const [menu,setMenu]=useState('hone');
    const {getTotalCartAmount,token,setToken}=useContext(StoreContext);
    const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate('/');

    }
  return (
    <div className='navbar'>
    <Link to='/'><img src={assets.logo} alt='' className='logo'></img></Link>
    <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu('home')} className={menu==="home"?"active":""}>Home</Link>
        <a  href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==="menu"?"active":""}>Menu</a>
        <a href='#appdownload' onClick={()=>setMenu('mobile-app')} className={menu==="mobile-app"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu('contact')} className={menu==="contact"?"active":""}>Contact us</a>
    </ul>
    <div className='navbar-right'>
        <img src={assets.search_icon} alt=''></img>
        <div className='navbar-search-icon'>
           <Link to='/cart'> <img src={assets.basket_icon} alt=''></img></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {
          !token?(<button onClick={()=>setShowLogin(true)}>Sign in</button>):(
          <div className='navbar-profile'>
          <img src={assets.profile_icon} alt='profile'></img>
          <ul className='navbar-profile-dropdown'>
            <li> <img src={assets.bag_icon} alt='bag'></img><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src={assets.logout_icon} alt='logout'></img><p>Logout</p></li>
          </ul>

          </div>)
        }
       
    </div>
      
    </div>
  )
}

export default Navbar
