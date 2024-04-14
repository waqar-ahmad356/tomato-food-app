import React, { createContext, useEffect, useState } from 'react'
import {food_list} from '../assets/assets'

export const StoreContext=createContext(null);
const StoreContextProvider = (props) => {
    const [cartitem,setCartItem]=useState({});
    const addToCart=(itemId)=>{
        if(!cartitem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }

    }
    const removeFromCart=(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        
        for(const item in cartitem)
        
        {
            if(cartitem[item]>0)
            {
                let itemInfo=food_list.find((product)=>product._id===item);
            totalAmount+=itemInfo.price+cartitem[item];
        }

            }
            return totalAmount;
            
    }

    const contextValue={
        food_list,cartitem,setCartItem,addToCart,removeFromCart,getTotalCartAmount }
  return (
    <StoreContext.Provider value={contextValue}>
    {props.children}
      
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
