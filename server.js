import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoute.js';
import 'dotenv/config';

//app config
const app=express();
const port=4000;

//db connection

connectDB();

//middleware
app.use(express.json());//when request from the frontend to backend that will be parsed to json

app.use(cors());// access the backend from any frontend
//api end point
app.use("/api/food",foodRouter);
app.use('/images',express.static('upload'));
app.use('/api/user',userRouter);


app.get('/',(req,res)=>{
    res.send("api working");
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
});

