import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
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
  const [authorName, setAuthorName] = useState({ id: '', name: '' });


  
  useEffect(() => {
    if (!token) {
      setAuthorName('');
      return;
    }

    const fetchLoggedInUser = async () => {
      try {
        const res = await fetch('https://backend-greenapron.onrender.com/api/profile', { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch logged-in user');
        const data = await res.json();
        setAuthorName({id: data.id , name: data.name}); 
      } catch (err) {
        console.error(err);
        setAuthorName('');
      }
    };

    fetchLoggedInUser();
  }, [token]);

  useEffect(() => {
  if (!token) return;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;

    if (decoded.exp < now) {
      console.log('Token expired');
      localStorage.removeItem('token');
      setToken(null);
    } else {
      // Set auto logout timeout
      const timeUntilExpire = decoded.exp * 1000 - Date.now();
      const logoutTimer = setTimeout(() => {
        console.log('Token expired (timer)');
        localStorage.removeItem('token');
        setToken(null);
      }, timeUntilExpire);

      return () => clearTimeout(logoutTimer);
    }
  } catch (err) {
    console.error('Token decode error:', err);
    localStorage.removeItem('token');
    setToken(null);
  }
}, [token]);


  useEffect(() => {
    if (!token) return;

    const fetchPeopleAndMessages = async () => {
      try {
        const usersResponse = await fetch('https://backend-greenapron.onrender.com/api/users');
        if (!usersResponse.ok) {
          throw new Error('Failed to fetch users');
        }
        const usersData = await usersResponse.json();

        const usersWithMessages = await Promise.all(
          usersData.map(async (user) => {
            const messagesResponse = await fetch(`https://backend-greenapron.onrender.com/api/messages/${user.id}`);
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

  const handlePostMessage = async (boardOwnerId, text, authorId) => {
    try {
      const response = await fetch('https://backend-greenapron.onrender.com/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization : `Bearer${token}`,
        },
        body: JSON.stringify({ board_owner_id: boardOwnerId, text, author_id: authorId }), 
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.log(errorBody)
        throw new Error('Failed to post message');
      }

      const newMessage = await response.json();
      const messageWithName = { ...newMessage, boardOwnerId };

      setPeople((prevPeople) =>
        prevPeople.map((user) =>
          user.id === boardOwnerId
            ? { ...user, messages: [messageWithName, ...(user.messages || [])] }
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
                <ApronCard people={people || []} onPostMessage={handlePostMessage} authorName={authorName} currentUserId={authorName.id}/>
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
