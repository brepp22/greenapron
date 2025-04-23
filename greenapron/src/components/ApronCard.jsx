import React from 'react';
import './ApronCard.css'; 

const ApronCard = ({ people }) => {
  return (
    <div className="board">
      {people.map((person, index) => (
        <div className="person-container" key={index}>
          {person.image && <img src={person.image} alt={person.name} />}
          <h3>{person.name}</h3>
          <p>{person.role}</p>
        </div>
      ))}
    </div>
  );
};

export default ApronCard;
