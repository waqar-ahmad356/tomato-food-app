// Importing the orderModel and userModel from their respective files
import orderModel from "../model/orderModel.js";
import userModel from "../model/usermodel.js"; 

// Importing the Stripe library for payment processing
import Stripe from 'stripe'

// Creating a new instance of Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Function to place an order from the frontend
const placeOrder = async (req, res) => {
    // Frontend URL for redirection after payment
    const frontend_url = "http://localhost:5173";
    try {
        // Creating a new order based on the request data
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        // Saving the new order to the database
        await newOrder.save();
        // Clearing the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Creating line items for the Stripe payment session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        // Adding delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100

            },
            quantity: 1
        })

        // Creating a new Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        // Sending a JSON response with the success status and session URL for redirection
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error)
        res.json({ success: false, message: "Error" });

    }
}

// Function to verify the status of an order (whether it's paid or not)
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            // If the payment is successful, update the order's payment status
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "paid" });
        } else {
            // If the payment is unsuccessful, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }

    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }

}

// Function to retrieve orders for a specific user from the frontend
const userOrders = async (req, res) => {
    try {
        // Finding orders for the specified user ID
        const orders = await orderModel.find({ userId: req.body.userId });
        // Sending a JSON response containing the user's orders
        res.json({ success: true, data: orders });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });

    }

}

// Function to list all orders for the admin panel
const listOrders = async (req, res) => {

    try {
        // Fetching all orders from the database
        const orders = await orderModel.find({});
        // Sending a JSON response containing all orders
        res.json({ success: true, data: orders });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });

    }

}

// API endpoint for updating the status of an order
const updateStatus = async (req, res) => {
    try {
        // Finding and updating the status of the specified order
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        // Sending a JSON response indicating success
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "error" });

    }

}

// Exporting the placeOrder, verifyOrder, userOrders, listOrders, and updateStatus functions for use in other files
export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }
