// Import React, useContext, useEffect, useState from React library
import React, { useContext, useEffect, useState } from 'react';

// Import CSS file for styling
import './PlaceOrder.css';

// Import StoreContext from the StoreContext file
import { StoreContext } from '../../Context/StoreContext';

// Import axios for making HTTP requests
import axios from 'axios';

// Import useNavigate hook from react-router-dom for navigation
import { useNavigate } from 'react-router-dom';

// Define the PlaceOrder component
const PlaceOrder = () => {
  // Destructure values from StoreContext
  const { getTotalCartAmount, token, food_list, cartitem, url } = useContext(StoreContext);

  // State for form data
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  // Function to handle changes in form input
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  // Function to place order
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    // Construct order items array
    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartitem[item._id];
        orderItems.push(itemInfo);
      }
    });

    // Construct order data
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Send order request
    let response = await axios.post(url + '/api/order/place', orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  }

  // UseNavigate hook for navigation
  const navigate = useNavigate();

  // Check if user is logged in or if cart is empty
  useEffect(() => {
    if (!token) {
      navigate('/cart');
      alert("Please login");
    } else if (getTotalCartAmount === 0) {
      navigate('/cart');
      alert("Please add at least one product to the cart!");
    }
  }, [token]);

  // Render the PlaceOrder component
  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type='text' placeholder='First Name'></input>
          <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type='text' placeholder='Last Name'></input>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your Email'></input>
        <input required name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street'></input>
        <div className='multi-fields'>
          <input required name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City'></input>
          <input required name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State'></input>
        </div>
        <div className='multi-fields'>
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip Code'></input>
          <input required name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country'></input>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone'></input>
      </div>
      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
            </div>
            <hr />
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

// Export the PlaceOrder component
export default PlaceOrder;
