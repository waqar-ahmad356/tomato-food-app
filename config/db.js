// Import mongoose package
import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = async () => {
    // Connect to the MongoDB Atlas cluster
    await mongoose.connect('mongodb+srv://waqarahmad:waqar392936@cluster0.27a3cf1.mongodb.net/foodapp-project')
        .then(() => {
            // If connection is successful, log a success message
            console.log("DB Connected");
        })
}
