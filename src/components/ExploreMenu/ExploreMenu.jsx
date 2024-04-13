import React from 'react'
import './ExploreMenu.css';
import {menu_list} from '../../assets/assets';

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
    <h1>Explore our menu</h1>
    <p className='explore-menu-text'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
    <div className='explore-menu-list'>
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className='explore-menu-list-item'>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='menu'></img>
                <p>{item.menu_name}</p>
                </div>

            )
        })}
    </div>

      <hr/>
    </div>
  )
}

export default ExploreMenu
