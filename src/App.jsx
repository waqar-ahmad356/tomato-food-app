import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { StoreContext } from './Context/StoreContext';

const App = () => {
  const {getTotalCartAmount}=useContext(StoreContext);
  const [showlogin,setShowLogin]=useState(false);
  return (
    <>
    {showlogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}></Route> 
      <Route path='/cart' element={<Cart/>}></Route> 
      {getTotalCartAmount()===0?"":<Route path='/order' element={<PlaceOrder/>}></Route> }
      
    </Routes>
      
    </div>
    <Footer/>
    </>
  )
}

export default App
