import React from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import App from './App'; // Replace 'App' with the appropriate root component of your application

// Set the app element

Modal.setAppElement('#root'); // Assuming '#root' is the ID of your root element

const rootElement = document.getElementById('root');

// Use createRoot to render your application
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
