// Import React and useState hook from React library
import React, { useState } from 'react';



// Import components used in the Home component
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

// Define the Home component
const Home = () => {
  
  // Define state for the selected category using the useState hook
  const [category, setCategory] = useState("All");

  // Render the Home component
  return (
    <div>
      {/* Render the Header component */}
      <Header />
      
      {/* Render the ExploreMenu component and pass category and setCategory as props */}
      <ExploreMenu category={category} setCategory={setCategory} />
      
      {/* Render the FoodDisplay component and pass category as a prop */}
      <FoodDisplay category={category} />
      
      {/* Render the AppDownload component */}
      <AppDownload />
    </div>
  );
}

// Export the Home component
export default Home;
