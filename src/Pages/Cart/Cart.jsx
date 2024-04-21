import React, { useContext } from 'react'
import './Cart.css';
import {StoreContext} from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate=useNavigate();
  const {cartitem,food_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
  return (
    <div className='cart'>
    <div className='cart-items'>
      <div className='cart-items-title'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <br/>
      <hr/>
      {
        food_list.map((item,index)=>{
          if(cartitem[item._id]>0){
            return(
              <div>
              <div className='cart-items-title cart-items-item'>
              <img src={url+"/images/"+item.image} alt='item'></img>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartitem[item._id]}</p>
              <p>${item.price*cartitem[item._id]}</p>
              <p className='cross' onClick={()=>removeFromCart(item._id)}>X</p>
                </div>
                <hr/></div>
            )
          }
        })
      }
    </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Sub Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
            </div>
            <hr/>
          </div>{getTotalCartAmount()===0?<button onClick={()=>navigate('/')}>PLEASE SELECT PRODUCT</button>
          : <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>}
         
        </div>
        <div className='cart-promo-code'>
          <div>
            <p>If you have a promo code , Enter it here.</p>
            <div className='cart-promo-code-input'>
              <input type='text' placeholder='Enter promo code'></input>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
