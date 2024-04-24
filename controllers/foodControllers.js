// Importing the foodModel from the foodModel.js file
import foodModel from "../model/foodModel.js";

// Importing the fs (File System) module for file operations
import fs from 'fs';

// Function to add a food item
const addFood = async (req, res) => {
    // Extracting the filename of the uploaded image
    let image_filename = `${req.file.filename}`;
    // Creating a new food item using the foodModel
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        // Saving the new food item to the database
        await food.save();
        // Sending a JSON response indicating success
        res.json({ success: true, message: "Food added" });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to retrieve all food items
const listfood = async (req, res) => {
    try {
        // Fetching all food items from the database
        const foods = await foodModel.find({});
        // Sending a JSON response containing the list of food items
        res.json({ success: true, data: foods });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Function to remove a food item
const removefood = async (req, res) => {
    try {
        // Finding the food item by its ID
        const food = await foodModel.findById(req.body.id);
        // Deleting the corresponding image file from the upload directory
        fs.unlink(`upload/${food.image}`, () => {})
        // Deleting the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        // Sending a JSON response indicating success
        res.json({ success: true, message: 'Product Removed' });
    } catch (error) {
        // If an error occurs, log the error and send a JSON response indicating failure
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Exporting the addFood, listfood, and removefood functions for use in other files
export { addFood, listfood, removefood };
