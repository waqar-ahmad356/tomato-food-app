import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const url = 'http://localhost:4000';
    const [image, setImage] = useState(null); // State to store the selected image file
    const [data, setData] = useState({ // State to store form data
        name: "",
        description: "",
        price: "",
        category: "Salad" // Default category
    });

    // Function to handle changes in input fields
    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    // Function to handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image); // Appending the selected image file to the form data

        // Sending a POST request to add a new food item
        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                // Resetting form fields and image state on successful submission
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                // Showing a success toast notification
                toast.success(response.data.message);
            } else {
                // Handling error response if needed
            }
        } catch (error) {
            console.error("Error:", error);
            // Handling error if request fails
        }
    }

    return (
        <div className='add'>
            {/* Form for adding a new food item */}
            <form className='flex-col' onSubmit={onSubmitHandler}>
                {/* Image upload section */}
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        {/* Displaying the selected image or a placeholder */}
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt='' />
                    </label>
                    {/* Input field for selecting an image file */}
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden required />
                </div>
                {/* Input field for the product name */}
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='type here' />
                </div>
                {/* Textarea for the product description */}
                <div className='add-product-description flex-col'>
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='write content here'></textarea>
                </div>
                {/* Dropdown menu for selecting product category */}
                <div className='add-product-category-price'>
                    {/* Select dropdown for product category */}
                    <div className='add-product-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name='category'>
                            {/* Options for different product categories */}
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
                    {/* Input field for product price */}
                    <div className='add-product-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='$20' />
                    </div>
                </div>
                {/* Submit button */}
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
}

export default Add;
