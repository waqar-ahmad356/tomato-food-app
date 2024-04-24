import React from 'react';
import './SideBar.css'; // Importing component-specific styles
import { assets } from '../../assets/assets'; // Importing assets
import { NavLink } from 'react-router-dom'; // Importing NavLink for routing

const SideBar = () => {
  return (
    <div className='sidebar'> {/* Sidebar container */}
      <div className='sidebar-options'> {/* Sidebar options container */}
        {/* NavLink for adding items */}
        <NavLink to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt=''></img> {/* Add icon */}
          <p>Add Items</p> {/* Text for adding items */}
        </NavLink>
        {/* NavLink for listing items */}
        <NavLink to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt=''></img> {/* Order icon */}
          <p>List Items</p> {/* Text for listing items */}
        </NavLink>
        {/* NavLink for viewing orders */}
        <NavLink to='/orders' className='sidebar-option'>
          <img src={assets.order_icon} alt=''></img> {/* Order icon */}
          <p>Orders</p> {/* Text for viewing orders */}
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
