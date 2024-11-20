import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming your main component is App
 // If you have a global CSS

// Create a root and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

