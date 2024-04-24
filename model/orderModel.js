// Importing mongoose package
import mongoose from "mongoose";

// Defining the schema for orders
const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID associated with the order
    items: { type: Array, required: true }, // Array of items in the order
    amount: { type: Number, required: true }, // Total amount of the order
    address: { type: Object, required: true }, // Address object where the order will be delivered
    status: { type: String, default: "Food Processing" }, // Status of the order (default: Food Processing)
    date: { type: Date, default: Date.now() }, // Date when the order was created (default: current date/time)
    payment: { type: Boolean, default: false } // Payment status of the order (default: false)
});

// Creating a mongoose model based on the order schema
// The model name is 'order', and it corresponds to the 'orders' collection in the database
// If the model 'order' already exists, it will be used; otherwise, a new model will be created
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// Exporting the orderModel for use in other files
export default orderModel;
