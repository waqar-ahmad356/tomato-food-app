// Importing mongoose package
import mongoose from "mongoose";

// Defining the schema for users
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // User's name
    email: { type: String, required: true, unique: true }, // User's email (unique)
    password: { type: String, require: true }, // User's password
    cartData: { type: Object, default: {} } // User's cart data (default: empty object)
}, { minimize: false }); // Ensures that empty objects are saved in the database

// Creating a mongoose model based on the user schema
// The model name is 'user', and it corresponds to the 'users' collection in the database
// If the model 'user' already exists, it will be used; otherwise, a new model will be created
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Exporting the userModel for use in other files
export default userModel;
