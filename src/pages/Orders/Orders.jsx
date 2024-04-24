import React, { useState, useEffect } from 'react';
import './Orders.css'; // Importing component-specific styles
import axios from 'axios'; // Importing Axios for making HTTP requests
import { toast } from 'react-toastify'; // Importing toast notification library
import { assets } from '../../assets/assets'; // Importing assets

const Orders = () => {
  const url = "http://localhost:4000"; // Backend URL

  const [orders, setOrders] = useState([]); // State to store the list of orders

  // Function to fetch all orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data); // Updating the orders state with fetched data
      } else {
        toast.error("Error fetching orders"); // Displaying an error toast if fetching fails
      }
    } catch (error) {
      console.error("Error:", error); // Logging error to console if request fails
      toast.error("Error fetching orders"); // Displaying an error toast if fetching fails
    }
  };

  // Function to handle status update of an order
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: e.target.value
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refreshing the list of orders after status update
      }
    } catch (error) {
      console.error("Error:", error); // Logging error to console if request fails
      toast.error("Error updating status"); // Displaying an error toast if status update fails
    }
  };

  // useEffect hook to fetch all orders when the component mounts
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className='order-list'>
        {/* Mapping over the list of orders and rendering each order */}
        {orders.map((order, index) => {
          return (
            <div key={index} className='order-item'>
              {/* Displaying order details */}
              <img src={assets.parcel_icon} alt='icon'></img>
              <div>
                <p className='order-item-food'>
                  {/* Mapping over order items and rendering each item */}
                  {order.items.map((item, index) => {
                    return (
                      <span key={index}>
                        {item.name} X {item.quantity}
                        {/* Displaying comma for all but the last item */}
                        {index !== order.items.length - 1 ? ", " : ""}
                      </span>
                    );
                  })}
                </p>
                <p className='order-item-name'>
                  {/* Displaying customer name */}
                  {order.address.firstname} {order.address.lastname}
                </p>
                <div className='order-item-address'>
                  {/* Displaying address */}
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </p>
                </div>
                <p className='order-item-phone'>{order.address.phone}</p>
              </div>
              {/* Displaying number of items and total amount */}
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              {/* Dropdown to update order status */}
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status}>
                <option value="Food processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
