// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({token, setToken}) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch user profile');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.name || user.username}</h2>
      <p>Parnter Number: {user.partner_number}</p>
      {/* <button type='button' onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Profile;
