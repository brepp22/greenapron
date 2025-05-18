import React, { useState } from 'react';
import './ApronCard.css';

const ApronCard = ({ people, onPostMessage }) => {
  const [inputs, setInputs] = useState({});

  const handlePost = (userId, index) => {
    const text = inputs[index] || '';
    if (!text.trim()) return;

    if (typeof onPostMessage === 'function') {
      onPostMessage(userId, text);
    }

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

  // 🛡️ Add this guard:
  if (!Array.isArray(people)) {
    return <p>Loading board...</p>;
  }

  return (
    <div className="board">
      {people.map((person, index) => (
        <div className="person-container" key={person.id}>
          {person.image && <img src={person.image} alt={person.name} />}
          <h3>{person.name}</h3>
          <p>{person.role}</p>

          <div className="messages">
            {person.messages && person.messages.length > 0 ? (
              person.messages.map((msg, i) => (
                <p key={msg.id || i} className="message">{msg.text}</p>
              ))
            ) : (
              <p className="message">No messages yet.</p>
            )}
          </div>

          <input
            className="input"
            type="text"
            placeholder="Leave a message"
            value={inputs[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button className="button" onClick={() => handlePost(person.id, index)}>Post</button>
        </div>
      ))}
    </div>
  );
};


export default ApronCard;
