import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <div className='appdownload' id='appdownload'>
    <p>
        For Better Experience Download <br/> Tomato App
    </p>
    <div className='appdownload-platforms'>
        <img src={assets.play_store} alt='playstore'></img>
        <img src={assets.app_store} alt='appstore'></img>
    </div>
      
    </div>
  )
}

export default AppDownload
