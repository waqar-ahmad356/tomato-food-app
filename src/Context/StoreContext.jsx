// Importing the axios library for making HTTP requests
import axios from 'axios';

// Importing necessary React modules and functions
import React, { createContext, useEffect, useState } from 'react';

// Creating a context object to share data between components
export const StoreContext = createContext(null);

// Defining a functional component named StoreContextProvider
const StoreContextProvider = (props) => {
    // State variables to hold food list, token, cart items, and API URL
    const [food_list, setFoodList] = useState([]);
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";
    const [cartitem, setCartItem] = useState(() => {
        // Initializing cart items with data from local storage, if available
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : {};
    });

    // useEffect hook to save cart data to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartitem));
    }, [cartitem]);

    // Function to add an item to the cart
    const addToCart = async (itemId) => {
        // If the item is not in the cart, add it; otherwise, increment its quantity
        if (!cartitem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // If a token is available, send a request to the server to add the item to the cart
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        // If the item quantity is more than 1, decrement its quantity; otherwise, remove it from the cart
        if (cartitem[itemId] > 1) {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } else {
            const newCart = { ...cartitem };
            delete newCart[itemId];
            setCartItem(newCart);
        }
        // If a token is available, send a request to the server to remove the item from the cart
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Function to calculate the total amount of items in the cart
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartitem) {
            if (cartitem[itemId] > 0) {
                let itemInfo = food_list.find((product) => product._id === itemId);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartitem[itemId];
                } else {
                    console.error(`Item with ID ${itemId} not found in food list.`);
                }
            }
        }
        return totalAmount;
    };

    // Function to fetch the list of food items from the server
    const fetchListData = async () => {
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data);
    };

    // Function to load cart data from the server based on the token
    const loadCartData = async (token) => {
        const response = await axios.post(url + "api/cart/get", {}, { headers: { token } });
        setCartItem(response.data.cartData);
    };

    // useEffect hook to load initial data when the component mounts
    useEffect(() => {
        async function loadData() {
            await fetchListData();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    // Creating a context value object to provide to consuming components
    const contextValue = {
        food_list,
        cartitem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token
    };

    // Returning the provider component with the context value and children
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

// Exporting the StoreContextProvider component as the default export
export default StoreContextProvider;
