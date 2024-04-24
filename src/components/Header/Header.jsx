import React from 'react'; // Importing React library
import './Header.css'; // Importing CSS file for styling

// Functional component for Header
const Header = () => {
  return (
    <div className='header'> {/* Container div with class header */}
      <div className='header-content'> {/* Container div for header content */}
        <h2>Order your favourite food here</h2> {/* Heading */}
        <p>
          {/* Paragraph explaining the purpose */}
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
        </p>
        <button>View Menu</button> {/* Button to view menu */}
      </div>
    </div>
  );
}

export default Header; // Exporting Header component
