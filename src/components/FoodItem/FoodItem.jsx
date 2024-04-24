import React, { useContext } from 'react'; // Importing React library and useContext hook
import './FoodItem.css'; // Importing CSS file for styling
import { assets } from '../../assets/assets'; // Importing assets from a specific directory
import { StoreContext } from '../../Context/StoreContext'; // Importing StoreContext from a specific directory

// Functional component for FoodItem
const FoodItem = ({ id, name, price, description, image }) => {
    // Accessing cartitem, addToCart, removeFromCart, and url from the context
    const { cartitem, addToCart, removeFromCart, url } = useContext(StoreContext);

    return (
        <div className='food-item'> {/* Container div with class food-item */}
            <div className='food-item-image-container'> {/* Container div for food item image */}
                <img className='food-item-image' src={url + "/images/" + image} alt='food'></img> {/* Image for food item */}
                {/* Conditional rendering of add or counter icons based on cartitem state */}
                {!cartitem[id] ? (
                    <img className='add' src={assets.add_icon_white} onClick={() => addToCart(id)}></img> 
                ) : (
                    <div className='food-item-counter'> {/* Container div for counter icons */}
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='icon'></img> {/* Remove icon */}
                        <p>{cartitem[id]}</p> {/* Quantity */}
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='icon'></img> {/* Add icon */}
                    </div>
                )}
            </div>
            <div className='food-item-info'> {/* Container div for food item info */}
                <div className='food-item-name-rating'> {/* Container div for name and rating */}
                    <p>{name}</p> {/* Food item name */}
                    <img src={assets.rating_starts} alt='rating'></img> {/* Rating image */}
                </div>
                <p className='food-item-desc'>{description}</p> {/* Food item description */}
                <p className='food-item-price'>${price}</p> {/* Food item price */}
            </div>
        </div>
    );
}

export default FoodItem; // Exporting FoodItem component
