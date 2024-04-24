import React from 'react'; // Importing React library
import './Footer.css'; // Importing CSS file for styling
import { assets } from '../../assets/assets'; // Importing assets from a specific directory

// Functional component for Footer
const Footer = () => {
  return (
    <div className='footer' id='footer'> {/* Container div with class footer and id footer */}
      <div className='footer-content'> {/* Container div for footer content */}
        {/* Left section of footer */}
        <div className='footer-content-left'>
          <img src={assets.logo} alt="Logo"></img> {/* Logo */}
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available
          </p>
          <div className='footer-social-icons'> {/* Container div for social media icons */}
            <img src={assets.facebook_icon} alt='Facebook'></img> {/* Facebook icon */}
            <img src={assets.twitter_icon} alt='Twitter'></img> {/* Twitter icon */}
            <img src={assets.linkedin_icon} alt='LinkedIn'></img> {/* LinkedIn icon */}
          </div>
        </div>
        {/* Center section of footer */}
        <div className='footer-content-center'>
          <h2>COMPANY</h2> {/* Heading */}
          <ul>
            <li>Home</li> {/* List item */}
            <li>About us</li> {/* List item */}
            <li>Delivery</li> {/* List item */}
            <li>Privacy Policy</li> {/* List item */}
          </ul>
        </div>
        {/* Right section of footer */}
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2> {/* Heading */}
          <ul>
            <li>+92-309-4247356</li> {/* Contact number */}
            <li>contact@tomato.com</li> {/* Email address */}
          </ul>
        </div>
      </div>
      <hr/> {/* Horizontal line */}
      <div className='footer-copyright'> {/* Container div for copyright */}
        <p>Copyright 2024 &copy; Tomato.com - All Right Reserved.</p>
      </div>
    </div>
  );
}

export default Footer; // Exporting Footer component
