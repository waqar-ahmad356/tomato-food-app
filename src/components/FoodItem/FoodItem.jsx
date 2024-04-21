import React, { useContext} from 'react'
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
    
    const{cartitem,addToCart,removeFromCart,url}=useContext(StoreContext);
  return (
    <div className='food-item'>
    <div className='food-item-image-container'>
        <img className='food-item-image' src={url+"/images/"+image} alt='food'></img>
        {
            !cartitem[id]?<img className='add' src={assets.add_icon_white} onClick={()=>addToCart(id)}></img>:
            <div className='food-item-counter'>
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt='icon'></img>
            <p>{cartitem[id]}</p>
            <img onClick={()=>addToCart(id)}src={assets.add_icon_green} alt='icon'></img>

            </div>
        }
    </div>
    <div className='food-item-info'>
        <div className='food-item-name-rating'>
            <p>{name}</p>
            <img src={assets.rating_starts} alt='rating'></img>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
    </div>
      
    </div>
  )
}

export default FoodItem
