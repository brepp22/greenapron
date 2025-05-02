import React, { useState, useEffect } from 'react';
import ApronCard from './components/ApronCard';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const peopleData = data.map(user => ({
          name: user.name,
          role: user.email, // Use another field if you prefer
          image: ''
        }));

        setPeople(peopleData);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error.message);
      }
    };

    fetchPeople();
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
