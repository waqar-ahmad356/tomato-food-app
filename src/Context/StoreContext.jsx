import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


export const StoreContext=createContext(null);


const StoreContextProvider = (props) => {
    const [food_list,setFoodList]=useState([]);
    const [token,setToken]=useState("");
    const url="http://localhost:4000";
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

    const fetchListData=async()=>{
        const response=await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);

    }
useEffect(()=>{
    async function loadData(){
        await fetchListData();
        if(localStorage.getItem("token"))
    {
        setToken(localStorage.getItem("token"))
    }

    }
    loadData();
    
},[])
    const contextValue={
        food_list,cartitem,setCartItem,addToCart,removeFromCart,getTotalCartAmount,url,setToken,token }
  return (
    <StoreContext.Provider value={contextValue}>
    {props.children}
      
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
