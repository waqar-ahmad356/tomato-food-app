// Import React, useContext, useEffect, useState from React library
import React, { useContext, useEffect, useState } from 'react';

// Import CSS file for styling
import './MyOrders.css';

// Import StoreContext from the StoreContext file
import { StoreContext } from '../../Context/StoreContext';

// Import axios for making HTTP requests
import axios from 'axios';

// Import assets from the assets folder
import { assets } from '../../assets/assets';

// Define the MyOrders component
const MyOrders = () => {

    // Define state variables using the useState hook
    const [data, setData] = useState([]);
    
    // Destructure the url and token from the StoreContext
    const { url, token } = useContext(StoreContext);

    // Define a function to fetch orders
    const fetchOrders = async () => {
        try {
            // Make a POST request to fetch user orders
            const response = await axios.post(url + '/api/order/user-orders', {}, {
                headers: { token }
            });
            // Set the fetched data to the state
            setData(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    
    // UseEffect hook to fetch orders when the token changes
    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    // Render the MyOrders component
    return (
        <div className='my-orders'>
            {/* Render the heading */}
            <h2>My Orders</h2>
            <div className='container'>
                {/* Map through the orders and render each order */}
                {data.map((order, index) => {
                    return (
                        <div key={index} className='my-orders-order'>
                            {/* Render the parcel icon */}
                            <img src={assets.parcel_icon} alt='icon' />
                            {/* Render the items in the order */}
                            <p>
                                {order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " " + item.quantity
                                    } else {
                                        return item.name + " " + item.quantity + ", "
                                    }
                                })}
                            </p>
                            {/* Render the amount of the order */}
                            <p>${order.amount}.00</p>
                            {/* Render the number of items in the order */}
                            <p>Items: {order.items.length}</p>
                            {/* Render the status of the order */}
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            {/* Render the 'Track Order' button */}
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// Export the MyOrders component
export default MyOrders;
