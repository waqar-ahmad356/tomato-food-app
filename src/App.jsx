import React from 'react'
import Navbar from './components/Navbar/Navbar'
import {Routes,Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <>
    <div className='app'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route> 
      <Route path='/cart' element={<Cart/>}></Route> 
      <Route path='/order' element={<PlaceOrder/>}></Route> 
    </Routes>
      
    </div>
    <Footer/>
    </>
  )
}

export default App
