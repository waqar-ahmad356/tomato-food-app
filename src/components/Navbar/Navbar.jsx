import React, { useContext, useState } from 'react';
import './Navbar.css'; // Importing CSS file for styling
import { assets } from '../../assets/assets'; // Importing assets from a specific directory
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate from react-router-dom
import { StoreContext } from '../../Context/StoreContext'; // Importing StoreContext from a specific directory

// Functional component for Navbar
const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate(); // Get navigation function from useNavigate hook

  // State variable to track active menu item
  const [menu, setMenu] = useState('home');

  // Destructuring context values and functions
  const { getTotalCartAmount, token, logout } = useContext(StoreContext);

  return (
    <div className='navbar'> {/* Container div for the navbar */}
      <Link to='/'> {/* Link to home page */}
        <img src={assets.logo} alt='' className='logo'></img> {/* Logo image */}
      </Link>
      <ul className='navbar-menu'> {/* Unordered list for menu items */}
        <Link to='/' onClick={() => setMenu('home')} className={menu === "home" ? "active" : ""}>Home</Link> {/* Home link */}
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === "menu" ? "active" : ""}>Menu</a> {/* Menu link */}
        <a href='#appdownload' onClick={() => setMenu('mobile-app')} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a> {/* Mobile App link */}
        <a href='#footer' onClick={() => setMenu('contact')} className={menu === "contact" ? "active" : ""}>Contact us</a> {/* Contact us link */}
      </ul>
      <div className='navbar-right'> {/* Container for right-side elements */}
        <img src={assets.search_icon} alt=''></img> {/* Search icon */}
        <div className='navbar-search-icon'> {/* Container for basket icon */}
          <Link to='/cart'> {/* Link to cart page */}
            <img src={assets.basket_icon} alt=''></img> {/* Basket icon */}
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div> {/* Dot indicator for items in the cart */}
        </div>
        {
          // Conditional rendering based on token
          !token ? (
            // Button to sign in
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            // Container for profile dropdown when logged in
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt='profile'></img> {/* Profile icon */}
              {/* Dropdown menu for profile options */}
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}> {/* Link to my orders page */}
                  <img src={assets.bag_icon} alt='bag'></img> {/* Bag icon */}
                  <p>Orders</p> {/* Orders text */}
                </li>
                <hr /> {/* Horizontal line separator */}
                <li onClick={logout}> {/* Logout option */}
                  <img src={assets.logout_icon} alt='logout'></img> {/* Logout icon */}
                  <p>Logout</p> {/* Logout text */}
                </li>
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Navbar; // Exporting Navbar component
