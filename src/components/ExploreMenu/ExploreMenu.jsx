import React from 'react'; // Importing React library
import './ExploreMenu.css'; // Importing CSS file for styling
import { menu_list } from '../../assets/assets'; // Importing menu_list from a specific directory

// Functional component for ExploreMenu
const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'> {/* Container div with class explore-menu and id explore-menu */}
      <h1>Explore our menu</h1> {/* Heading */}
      <p className='explore-menu-text'> {/* Paragraph explaining the purpose */}
        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
      </p>
      <div className='explore-menu-list'> {/* Container div for menu list */}
        {menu_list.map((item, index) => { // Mapping over the menu_list array
          return (
            <div onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)} className='explore-menu-list-item'> {/* Div for each menu item */}
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='menu'></img> {/* Image for menu item */}
              <p>{item.menu_name}</p> {/* Text for menu item */}
            </div>
          );
        })}
      </div>
      <hr/> {/* Horizontal line */}
    </div>
  );
}

export default ExploreMenu; // Exporting ExploreMenu component
