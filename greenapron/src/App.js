import React, { useState, useEffect } from 'react';
import ApronCard from './components/ApronCard';
import './App.css';



function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeopleAndMessages = async () => {
      try {
        const usersResponse = await fetch('http://localhost:8080/api/users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();

        // Fetch messages for each user
        const usersWithMessages = await Promise.all(usersData.map(async (user) => {
          const messagesResponse = await fetch(`http://localhost:8080/api/messages/${user.id}`);
          const messagesData = await messagesResponse.json();
          return {
            ...user,
            messages: messagesData
          };
        }));

        setPeople(usersWithMessages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPeopleAndMessages();
  }, []);

  const handlePostMessage = async (userId, text) => {
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ person_id: userId, text }),
      });

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      const newMessage = await response.json();
      
      // After posting the message, update the user's messages locally
      setPeople((prevPeople) =>
        prevPeople.map((user) =>
          user.id === userId
            ? { ...user, messages: [...user.messages, newMessage] }
            : user
        )
      );
    } catch (error) {
      console.error('Post message error:', error);
    }
  };

  return (
    
    <div className="App">
      <h1>Green Apron Board</h1>
      {error && <p>Error: {error}</p>}
      <ApronCard people={people} onPostMessage={handlePostMessage} />
    </div>
   
  );
}

export default App;
