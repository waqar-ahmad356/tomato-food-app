import React from 'react'
import './Footer.css';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo}></img>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</p>
        <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt='icon'></img>
            <img src={assets.twitter_icon} alt='icon'></img>
            <img src={assets.linkedin_icon} alt='icon'></img>
        </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+92-309-4247356</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
    </div>
    <hr/>
    <div className='footer-copyright'>
        <p>Copyright 2024 &copy; Tomato.com - All Right Reserved.</p>
    </div>
      
    </div>
  )
}

export default Footer
