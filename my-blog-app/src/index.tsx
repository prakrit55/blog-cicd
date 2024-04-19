import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
// import './index.css'; // Import global CSS file for styling
const pq : any = document.getElementById('root')
const root = createRoot(pq);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);