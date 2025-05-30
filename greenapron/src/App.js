import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ApronCard from './components/ApronCard';
import LoginForm from './components/LoginForm';
import Landing from './components/Landing';
import Profile from './components/Profile';
import './App.css';
import Nav from './components/Nav';

function App() {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authorName, setAuthorName] = useState('');

  
  useEffect(() => {
    if (!token) {
      setAuthorName('');
      return;
    }

    const fetchLoggedInUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/profile', { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch logged-in user');
        const data = await res.json();
        setAuthorName(data.name); 
      } catch (err) {
        console.error(err);
        setAuthorName('');
      }
    };

    fetchLoggedInUser();
  }, [token]);

  useEffect(() => {
    if (!token) return;

    const fetchPeopleAndMessages = async () => {
      try {
        const usersResponse = await fetch('http://localhost:8080/api/users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();

        const usersWithMessages = await Promise.all(
          usersData.map(async (user) => {
            const messagesResponse = await fetch(`http://localhost:8080/api/messages/${user.id}`);
            const messagesData = messagesResponse.ok ? await messagesResponse.json() : [];
            return {
              ...user,
              messages: Array.isArray(messagesData) ? messagesData : [],
            };
          })
        );

        setPeople(usersWithMessages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPeopleAndMessages();
  }, [token]);

  const handlePostMessage = async (userId, text, name) => {
    try {
      const response = await fetch('http://localhost:8080/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ person_id: userId, text, name }), 
      });

      if (!response.ok) {
        throw new Error('Failed to post message');
      }

      const newMessage = await response.json();
      const messageWithName = { ...newMessage, name };

      setPeople((prevPeople) =>
        prevPeople.map((user) =>
          user.id === userId
            ? { ...user, messages: [...(user.messages || []), messageWithName] }
            : user
        )
      );
    } catch (error) {
      console.error('Post message error:', error);
    }
  };

  return (
    <>
      <Nav token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route
          path="/profile"
          element={token ? <Profile token={token} setToken={setToken} /> : <Navigate to="/login" />}
        />
        <Route
          path="/board"
          element={
            token ? (
              <div className="App">
                <h1>Green Apron Board</h1>
                {error && <p>Error: {error}</p>}
                <ApronCard people={people || []} onPostMessage={handlePostMessage} authorName={authorName} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
