import mongoose  from "mongoose";
export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://waqarahmad:waqar392936@cluster0.27a3cf1.mongodb.net/foodapp-project').then(()=>{
        console.log("DB Connected");
    })
}