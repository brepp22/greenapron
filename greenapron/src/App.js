import React, { useState, useEffect } from 'react';
import ApronCard from './components/ApronCard';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchPeople = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/api/users');
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();

  //       const peopleData = data.map(user => ({
  //         name: user.name,
  //         role: user.email, // Use another field if you prefer
  //         image: ''
  //       }));

  //       setPeople(peopleData);
  //     } catch (error) {
  //       console.error('Fetch error:', error);
  //       setError(error.message);
  //     }
  //   };

  //   fetchPeople();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, messagesRes] = await Promise.all([
          fetch('http://localhost:8080/api/users'),
          fetch('http://localhost:8080/api/messages'),
        ]);
  
        if (!usersRes.ok || !messagesRes.ok) {
          throw new Error('One or more network responses were not ok');
        }
  
        const [users, messages] = await Promise.all([
          usersRes.json(),
          messagesRes.json(),
        ]);
  
        const peopleWithMessages = users.map(user => ({
          id: user.id,
          name: user.name,
          role: user.email, // or another role field
          image: '', // add image if available
          messages: messages
            .filter(msg => msg.person_id === user.id)
            .map(msg => msg.text), // or include more fields if needed
        }));
  
        setPeople(peopleWithMessages);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="App">
      <h1>Green Apron Board</h1>
      {error && <p>Error: {error}</p>}
      <ApronCard people={people} />
    </div>
  );
}

export default App;
