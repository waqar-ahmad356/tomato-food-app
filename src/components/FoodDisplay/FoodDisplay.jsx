import React, { useContext } from 'react'; // Importing React library and useContext hook
import './FoodDisplay.css'; // Importing CSS file for styling
import { StoreContext } from '../../Context/StoreContext'; // Importing StoreContext from a specific directory
import FoodItem from '../FoodItem/FoodItem'; // Importing FoodItem component from a specific directory

// Functional component for FoodDisplay
const FoodDisplay = ({ category }) => {
    // Accessing food_list from the context
    const { food_list } = useContext(StoreContext);

    return (
        <div className='food-display' id='food-display'> {/* Container div with class food-display and id food-display */}
            <h2>Top dishes near you</h2> {/* Heading */}
            <div className='food-display-list'> {/* Container div for food display list */}
                {/* Mapping over food_list to display FoodItem components */}
                {food_list.map((item, index) => {
                    // Conditionally rendering FoodItem based on category selection
                    if (category === "All" || category === item.category) {
                        return (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
}

export default FoodDisplay; // Exporting FoodDisplay component
