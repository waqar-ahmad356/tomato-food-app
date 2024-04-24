// Importing the Express framework
import express from 'express';

// Importing the authentication middleware
import authMiddleWare from '../middleware/auth.js';

// Importing the controller functions for handling order operations
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';

// Creating an Express router instance
const orderRouter = express.Router();

// Route for placing an order, protected by the authMiddleWare middleware
orderRouter.post('/place', authMiddleWare, placeOrder);

// Route for verifying an order
orderRouter.post('/verify', verifyOrder);

// Route for fetching orders of a specific user, protected by the authMiddleWare middleware
orderRouter.post('/user-orders', authMiddleWare, userOrders);

// Route for listing all orders
orderRouter.get('/list', listOrders);

// Route for updating the status of an order
orderRouter.post('/status', updateStatus);

// Exporting the orderRouter for use in other files
export default orderRouter;
