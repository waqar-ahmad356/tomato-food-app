import express from 'express';
import { addFood ,listfood,removefood} from '../controllers/foodControllers.js';
import multer from 'multer'; //use image storage system

const foodRouter=express.Router();

//image storage engine
const storage=multer.diskStorage({
    destination:"upload",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get('/list',listfood)
foodRouter.post('/remove',removefood)

export default foodRouter;