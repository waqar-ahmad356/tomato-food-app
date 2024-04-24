import React from 'react'; // Importing React library
import './AppDownload.css'; // Importing CSS file for styling
import { assets } from '../../assets/assets'; // Importing assets from a specific directory

// Functional component for AppDownload
const AppDownload = () => {
  return (
    <div className='appdownload' id='appdownload'> {/* Container div with class appdownload and id appdownload */}
      <p>
        For Better Experience Download <br/> Tomato App {/* Paragraph indicating downloading instructions */}
      </p>
      <div className='appdownload-platforms'> {/* Container div for app download platforms */}
        <img src={assets.play_store} alt='playstore'></img> {/* Image for Google Play Store */}
        <img src={assets.app_store} alt='appstore'></img> {/* Image for Apple App Store */}
      </div>
    </div>
  )
}

export default AppDownload; // Exporting AppDownload component
