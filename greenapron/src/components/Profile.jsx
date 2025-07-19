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
        const res = await fetch(`https://backend-greenapron.onrender.com/api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch user profile');

        const data = await res.json();

        console.log(data)

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
      <h2> {user.name.split(' ')[0]}</h2>
      <img src={user.photo} alt="profile-photo" className='profile-photo' />
      <p>Partner Number: {user.partner_number}</p>

      <h3>Comments Received:</h3>
      {user.comments_received && user.comments_received.length > 0 ? (
        <ul className="comments-list">
          {user.comments_received.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.from_user}:</strong> {comment.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments received yet.</p>
      )}

    </div>
  );
};

export default Profile;
