import React, {  useContext, useState } from 'react'
import './LoginPop.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopup = ({setShowLogin}) => {
const {url,setToken,token}=useContext(StoreContext);

    const [currstate,setCurrState]=useState("Login")

    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))

    }

    const onLogin=async(e)=>{
        e.preventDefault();

        let newurl=url;
        if(currstate==="Login"){
            newurl+='/api/user/login';
        }
        else{
            newurl+='/api/user/register';
        }

        const response=await axios.post(newurl,data);

        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }
    



    }

    
  return (
    <div className='login-popup'>
    <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
            <h2>{currstate}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt='close'></img>
        </div>
    
    <div className='login-popup-input'>
    {currstate==="Login"?<></>:<input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='your name' required></input>}
        
        <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='your email' required></input>
        <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='password' required></input>
    </div>
    <button type='submit'>{currstate==='Sign up'?"Create account":"Login"}</button>
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
