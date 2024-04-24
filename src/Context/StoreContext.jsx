import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create a new context called StoreContext
export const StoreContext = createContext(null);

// Define the StoreContextProvider component
const StoreContextProvider = (props) => {
    // Define state variables using the useState hook
    const [food_list, setFoodList] = useState([]); // State for food list
    const [token, setToken] = useState(""); // State for authentication token
    const url = "http://localhost:4000"; // API base URL
    const [cartitem, setCartItem] = useState(() => {
        // State for cart items, initialized from localStorage
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : {};
    });

    // Effect to update localStorage when cartitem state changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartitem));
    }, [cartitem]);

    // Function to add an item to the cart
    const addToCart = async (itemId) => {
        // Update cartitem state
        if (!cartitem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        // Send request to server to update cart if user is authenticated
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    // Function to remove an item from the cart
    const removeFromCart = async (itemId) => {
        // Update cartitem state
        if (cartitem[itemId] > 1) {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        } else {
            const newCart = { ...cartitem };
            delete newCart[itemId];
            setCartItem(newCart);
        }
        // Send request to server to update cart if user is authenticated
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    // Function to calculate total cart amount
    const getTotalCartAmount = () => {
        // Calculate total amount based on items in the cart and their prices
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

    // Function to fetch list data from the server
    const fetchListData = async () => {
        // Fetch list data from the server and update food_list state
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data);
    };

    // Function to load cart data from the server
    const loadCartData = async (token) => {
        // Load cart data from the server and update cartitem state
        const response = await axios.post(url + "api/cart/get", {}, { headers: { token } });
        setCartItem(response.data.cartData);
    };

    // Effect to fetch list data and load cart data when component mounts
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

    // Function to clear cart and token when user logs out
    const logout = () => {
        // Clear cart and token from localStorage and reset state
        localStorage.removeItem("cart");
        localStorage.removeItem("token");
        setCartItem({});
        setToken("");
    };

    // Define the context value object with all the necessary values and functions
    const contextValue = {
        food_list,
        cartitem,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        setToken,
        token,
        logout // Adding logout function to context value
    };

    // Render the StoreContext.Provider with the context value and children components
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

// Export the StoreContextProvider component
export default StoreContextProvider;
