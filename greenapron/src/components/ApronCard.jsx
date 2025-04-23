import React, { useState } from 'react';
import './ApronCard.css';

const ApronCard = ({ people }) => {
  const [messages, setMessages] = useState({});
  const [inputs, setInputs] = useState({});

  const handlePost = (index) => {
    const text = inputs[index] || '';
    if (!text.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), text],
    }));

    setInputs((prev) => ({
      ...prev,
      [index]: '',
    }));
  };

  const handleInputChange = (index, value) => {
    setInputs((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  return (
    <div className="board">
      {people.map((person, index) => (
        <div className="person-container" key={index}>
          {person.image && <img src={person.image} alt={person.name} />}
          <h3>{person.name}</h3>
          <p>{person.role}</p>

          <div className="messages">
            {(messages[index] || []).map((msg, i) => (
              <p key={i} className="message">{msg}</p>
            ))}
          </div>

          <input
            type="text"
            placeholder="Leave a message"
            value={inputs[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => handlePost(index)}>Post</button>
        </div>
      ))}
    </div>
  );
};

export default ApronCard;
