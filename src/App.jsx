import React from 'react'
import Navbar from './components/Navbar/Navbar'
import SideBar from './components/SideBar/SideBar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  
  return (
    <div>
    <ToastContainer/>
    <Navbar/>
    <hr/>
    <div className='app-content'>
      <SideBar/>
      <Routes>
        <Route path='/add' element={<Add/>} ></Route>
        <Route path='/list' element={<List/>} ></Route>
        <Route path='/orders' element={<Orders/>} ></Route>
      </Routes>
    </div>
      
    </div>
  )
}

export default App
