import foodModel from "../model/foodModel.js";

import fs from 'fs';

//add food item

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`
    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"food added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }


}
//all food list
const listfood=async(req,res)=>{
    try{
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error"});
    }

}
// remove food items


const removefood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        fs.unlink(`upload/${food.image}`, () => {})
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:'Product Removed'});
        
           
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



  
export {addFood,listfood,removefood}