// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const predefinedAvatars = [
  '/avatars/avatar1.png', 
  '/avatars/avatar2.png'
]

const roleOptions= ['Barista', 'Shift Supervisor', 'Store Manager']

const Profile = ({token, setToken}) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState('');
  const [role, setRole] = useState('')
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
        setBio(data.bio || ''); 
        setPhoto(data.photo || '/avatars/default.png')
        setRole(data.role || '');
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

  try{
    const res = await fetch(`https://backend-greenapron.onrender.com/api/users/profile`, {
      method: 'PUT', 
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({bio, photo, role})
    });

    if(!res.ok) throw new Error ('Failed to update profile');
    const updatedUser = await res.json();
    setUser(updatedUser);
    setEditMode(false)
  } catch(err){
    console.log(err);
  }
};

  if (!user) return <p>Loading...</p>;


  

  return (
    <div className="profile-container">
      <h2> {user.name.split(' ')[0]}</h2>
      {/* <img src={user.photo} alt="profile-photo" className='profile-photo' /> */}
       <img
       src={user.photo || '/avatars/default.png'}
       alt="Profile avatar"
       className="profile-photo"
      />

      {!editMode && (
        <button 
          type='button'
          className = 'update-profile-button'
          onClick={() => setEditMode(true)}
          >
            Update Profile 
          </button>
      )}

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

      {/* Modal / Popup for editing profile */}
      {editMode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit} className="edit-profile-form">
              <div className="avatar-selection">
                <p>Choose New Avatar:</p>
                <div className="avatars-wrapper">
                  {predefinedAvatars.map((url) => (
                    <img
                      key={url}
                      src={url}
                      alt="avatar option"
                      className={`avatar-option ${photo === url ? 'selected' : ''}`}
                      onClick={() => setPhoto(url)}
                    />
                  ))}
                </div>
                
              

  
    <p className='role'><strong>Role:</strong></p>
    {roleOptions.map((r) => (
      <label key={r} className="role-option">
        <input
          type="radio"
          name="role"
          value={r}
          checked={role === r}
          onChange={() => setRole(r)}
        />
        {r}
      </label>
    ))}
 

  <label>
    <p className='bio'><strong>Bio:</strong></p>
      <textarea 
        value={bio}
        className ='bio-input'
        onChange={(e) => setBio(e.target.value)}
        rows={4}
        />
  </label>
</div>
              <div className="modal-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


export default Profile;
