// SuccessPage.jsx
import React from 'react';
import './styling/successPage.css'

const SuccessPage: React.FC = () => {
  return (
    <div className="success-page">
      <h1 className="success-heading">Post Created!</h1>
      <p className="success-text">Your post has been successfully submitted.</p>
      <a href="/" className="success-link">Go back to Home Page</a>
    </div>
  );  
};

export default SuccessPage;
