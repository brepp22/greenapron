import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/board'); 
  };

  return (

    <div className="landing-container">
      <header className="landing-header">
        <h1> Green Apron Board</h1>
        <button className="start-button" onClick={handleGetStarted}>
          Write a Message
        </button>
      </header>
    </div>
  );
};

export default Landing;
