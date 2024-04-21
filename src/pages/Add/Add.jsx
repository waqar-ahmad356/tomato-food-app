import React, {  useState } from 'react'
import './Add.css';
import {assets} from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {
    const url='http://localhost:4000';
    const[image,setImage]=useState(false);
    const[data,setData]=useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })


    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))

    }
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        const response=await axios.post(`${url}/api/food/add`,formData);
        if(response.data.success){
            setData({
        name:"",
        description:"",
        price:"",
        category:"Salad"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{

        }


    }
  return (
    <div className='add'>
    <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className='add-image-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''></img>
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required></input>
        </div>
        <div className='add-product-name flex-col'>
        <p>Product Name</p>
        <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='type here'></input>

        </div>
        <div className='add-product-description flex-col'>
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='write content here'></textarea>
        </div>
        <div className='add-product-category-price'>
        <div className='add-product-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler}  name='category'>
                <option>Salad</option>
                <option>Rolls</option>
                <option>Deserts</option>
                <option>Sandwich</option>
                <option>Cake</option>
                <option>Pure Veg</option>
                <option>Pasta</option>
                <option>Noodles</option>
            </select>
        </div>
        <div className='add-product-price flex-col'>
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20'></input>
        </div>
           
        </div>
        <button type='submit' className='add-btn' >ADD</button>
        
    </form>

      
    </div>
  )
}

export default Add
