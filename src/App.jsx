// Import React, useContext, and useState from React library
import React, { useContext, useState } from 'react';

// Import Navbar component
import Navbar from './components/Navbar/Navbar';

// Import Routes and Route components from react-router-dom for routing
import { Routes, Route } from 'react-router-dom';

// Import pages/components
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import { StoreContext } from './Context/StoreContext';
import Verify from './Pages/Verify/Verify';
import MyOrders from './Pages/MyOrders/MyOrders';

// Define the App component
const App = () => {
  // Use the useContext hook to access context values
  const { getTotalCartAmount } = useContext(StoreContext);

  // State variable to control login popup visibility
  const [showlogin, setShowLogin] = useState(false);

  // Render the App component
  return (
    <>
      {/* Conditionally render the login popup */}
      {showlogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}

      {/* Main app container */}
      <div className='app'>
        {/* Navbar component */}
        <Navbar setShowLogin={setShowLogin} />

        {/* Routes for different pages */}
        <Routes>
          <Route path='/' element={<Home />} /> {/* Route for Home page */}
          <Route path='/cart' element={<Cart />} /> {/* Route for Cart page */}
          {/* Route for PlaceOrder page, rendered only if cart is not empty */}
          {getTotalCartAmount() === 0 ? "" : <Route path='/order' element={<PlaceOrder />} />}
          <Route path='/verify' element={<Verify />} /> {/* Route for Verify page */}
          <Route path='/myorders' element={<MyOrders />} /> {/* Route for MyOrders page */}
        </Routes>
      </div>

      {/* Footer component */}
      <Footer />
    </>
  );
}

// Export the App component
export default App;
