import React, { useState, useEffect } from 'react';
import ApronCard from './components/ApronCard';
import './App.css';

function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/messages/1'); // Adjust URL based on your backend
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Map the data from the API to the structure needed for the ApronCard component
        const peopleData = data.map(message => ({
          name: message.person_id, // Adjust this based on your API's response
          role: message.text, // Adjust this based on your API's response
          image: '' // You can update this if the API returns image data
        }));

        setPeople(peopleData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPeople();
  }, []); // Empty array means this effect runs only once after the initial render

  return (
    <div className="App">
      <h1>Green Apron Board</h1>

      {error && <p>Error: {error}</p>}

      <ApronCard people={people} />
    </div>
  );
}

export default App;

