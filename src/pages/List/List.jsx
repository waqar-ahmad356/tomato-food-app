import React, { useEffect, useState } from 'react';
import './List.css'; // Importing component-specific styles
import axios from 'axios'; // Importing Axios for making HTTP requests
import { toast } from 'react-toastify'; // Importing toast notification library

const List = () => {
  const url = 'http://localhost:4000'; // Backend URL
  const [list, setList] = useState([]); // State to store the list of food items

  // Function to fetch the list of food items from the backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data); // Updating the list state with fetched data
      } else {
        toast.error("Error fetching data"); // Displaying an error toast if fetching fails
      }
    } catch (error) {
      console.error("Error:", error); // Logging error to console if request fails
      toast.error("Error fetching data"); // Displaying an error toast if fetching fails
    }
  };

  // useEffect hook to fetch the list of food items when the component mounts
  useEffect(() => {
    fetchList();
  }, []);

  // Function to remove a food item
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList(); // Refreshing the list after removal
      if (response.data.success) {
        toast.success("Product Removed Successfully"); // Displaying a success toast if removal is successful
      } else {
        toast.error("Error removing product"); // Displaying an error toast if removal fails
      }
    } catch (error) {
      console.error("Error:", error); // Logging error to console if request fails
      toast.error("Error removing product"); // Displaying an error toast if removal fails
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className='list-table'>
        {/* Displaying the table headers */}
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Mapping over the list of food items and rendering each item */}
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              {/* Displaying the image, name, category, and price of the food item */}
              <img src={`${url}/images/${item.image}`} alt='pic' />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              {/* Button to remove the food item */}
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
