import React from 'react';
import { useNavigate } from 'react-router-dom';
// import './LandingPage.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/board'); // or wherever you want to take the user
  };

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Green Apron Board</h1>
        <p></p>
        <button className="cta-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </header>
    </div>
  );
};

export default Landing;
