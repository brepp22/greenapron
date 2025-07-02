import React, { useState } from 'react';
import './ApronCard.css';

const ApronCard = ({ people, onPostMessage, authorName, currentUserId }) => {
  const [inputs, setInputs] = useState({});
  const [expand, setExpand] = useState({});

  const filteredPeople = people.filter((person) => person.id !== currentUserId);


  const handlePost = (userId, index, authorName) => {
    const text = inputs[index] || '';
    if (!text.trim()) return;

    if (typeof onPostMessage === 'function') {
      onPostMessage(userId, text, authorName.id);
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

  const handleExpand = (personId) => {
    setExpand((prev) => ({
      ...prev,
      [personId] : !prev[personId],
    }));
  }

  if (!Array.isArray(people)) {
    return <p>Loading board...</p>;
  }

  return (
    <div className="board">
  
    {filteredPeople.map((person, index) => {
        const isExpand = expand[person.id];
        const messages = person.messages ?? [];
        const visibleMessages = isExpand ? messages : messages.slice(0,3);
        
        return (
        <div className="person-container" key={person.id}>
          {person.image && <img src={person.image} alt={person.name} />}
          <h3>{person.name.split(' ')[0]}</h3>
          <p>{person.role}</p>

          <div className="messages">
            {visibleMessages.length > 0 ? (
              visibleMessages.map((msg, i) => (
                <p key={msg.id || i} className="message">
                  <strong>{msg.author_name.split(' ')[0] || 'Anonymous'}</strong>: {msg.text}
                </p>
              ))
            ) : (
              <p className="message">No messages yet.</p>
            )}
            {messages.length > 3 && (
              <button className='message-toggle' onClick={() => handleExpand(person.id)}>
                {isExpand ? 'Show Less' : 'View All Messages'}
              </button>
            )}
          </div>

          <input
            className="input"
            type="text"
            placeholder="Leave a message"
            value={inputs[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button className="button" onClick={() => handlePost(person.id, index, authorName)}>
            Post
          </button>
        </div>
      );
    })}
    </div>
  );
};

export default ApronCard;
