// Import React and ReactDOM from React library
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the main App component
import App from './App.jsx';

// Import the global styles
import './index.css';

// Import BrowserRouter for routing
import { BrowserRouter } from 'react-router-dom';

// Import the StoreContextProvider for managing global state
import StoreContextProvider from './Context/StoreContext.jsx';

// Render the root component using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrap the entire app with BrowserRouter for routing
  <BrowserRouter>
    {/* Wrap the App component with StoreContextProvider to provide global state */}
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
