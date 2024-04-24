// Import React, useContext, useEffect from React library
import React, { useContext, useEffect } from 'react';

// Import CSS file for styling
import './Verify.css';

// Import useNavigate and useSearchParams hooks from react-router-dom for navigation and accessing URL parameters
import { useNavigate, useSearchParams } from 'react-router-dom';

// Import StoreContext from the StoreContext file
import { StoreContext } from '../../Context/StoreContext';

// Import axios for making HTTP requests
import axios from 'axios';

// Define the Verify component
const Verify = () => {
    // Get URL parameters
    const [searchparams, setSearchParams] = useSearchParams();
    const success = searchparams.get("success");
    const orderId = searchparams.get("orderId");

    // Get URL from StoreContext
    const { url } = useContext(StoreContext);

    // useNavigate hook for navigation
    const navigate = useNavigate();

    // Function to verify payment
    const verifyPayment = async () => {
        // Send verification request
        const response = await axios.post(url + '/api/order/verify', { success, orderId });
        if (response.data.success) {
            navigate('/myorders'); // Navigate to myorders page if payment is verified
        } else {
            navigate('/'); // Navigate to home page if payment is not verified
        }
    }

    // useEffect hook to verify payment when the component mounts
    useEffect(() => {
        verifyPayment();
    }, []);

    // Render the Verify component
    return (
        <div className='verify'>
            <div className='spinner'>
                {/* Spinner component */}
            </div>
        </div>
    );
}

// Export the Verify component
export default Verify;
