// Importing the Express framework
import express from 'express';

// Importing the controller functions for handling food operations
import { addFood, listfood, removefood } from '../controllers/foodControllers.js';

// Importing multer for handling file uploads
import multer from 'multer';

// Creating an Express router instance
const foodRouter = express.Router();

// Configuring multer to handle file uploads and define storage options
const storage = multer.diskStorage({
    destination: "upload", // Destination directory for storing uploaded files
    filename: (req, file, cb) => {
        // Generating a unique filename based on the current timestamp and the original filename
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

// Creating an upload middleware using multer with the defined storage options
const upload = multer({ storage: storage });

// Route for adding a food item, using multer middleware to handle image upload
foodRouter.post("/add", upload.single("image"), addFood);

// Route for listing all food items
foodRouter.get('/list', listfood);

// Route for removing a food item
foodRouter.post('/remove', removefood);

// Exporting the foodRouter for use in other files
export default foodRouter;
