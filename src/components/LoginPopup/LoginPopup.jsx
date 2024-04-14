import React, { useState } from 'react'
import './LoginPop.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({setShowLoginin}) => {
    const [currstate,setCurrState]=useState("Login")
  return (
    <div className='login-popup'>
    <form className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currstate}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLoginin(false)}></img>
        </div>
    
    <div className='login-popup-input'>
    {currstate==="Login"?<></>:<input type='text' placeholder='your name' required></input>}
        
        <input type='email' placeholder='your email' required></input>
        <input type='password' placeholder='password' required></input>
    </div>
    <button>{currstate==='Sign up'?"Create account":"Login"}</button>
    <div className='login-popup-condition'>
        <input type='checkbox' required></input>
        <p>By continuing, i agree to the terms of use & privacy policy</p>
    </div>
    {currstate==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign up")}>Click here</span></p>
    : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
    }
    
    </form>
    </div>
  )
}

export default LoginPopup
