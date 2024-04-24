import React from 'react';
import './Navbar.css'; // Importing component-specific styles
import { assets } from '../../assets/assets'; // Importing assets

const Navbar = () => {
  return (
    <div className='navbar'> {/* Navbar container */}
      <img src={assets.logo} alt='logo' className='logo'></img> {/* Logo */}
      <img src={assets.profile_image} alt='profile' className='profile'></img> {/* Profile image */}
    </div>
  );
};

export default Navbar;
