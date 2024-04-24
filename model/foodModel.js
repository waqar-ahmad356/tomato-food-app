// Importing mongoose package
import mongoose from "mongoose";

// Defining the schema for food items
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true }
});

// Creating a mongoose model based on the food schema
// The model name is 'food', and it corresponds to the 'food' collection in the database
const foodModel = mongoose.model('food', foodSchema);

// Exporting the foodModel for use in other files
export default foodModel;
