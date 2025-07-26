import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({setToken}) => {
  // const [form, setForm] = useState({ partner_number: '', password: '', role: '', image: null });
  const [form, setForm] = useState({partner_number: '', password: '', role: '', image: ''})
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const roleOptions = ['Barista', 'Shift Supervisor', 'Store Manager'];


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ?
      'https://backend-greenapron.onrender.com/api/users/register' :
      'https://backend-greenapron.onrender.com/api/users/login';

    const payload = isRegister ?
      form :
      {partner_number:form.partner_number , password:form.password};


    try {
      const res = await axios.post(endpoint, payload);
      console.log(`${isRegister ? 'Registration' : 'Login'}`, res.data.token); 
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token); 
      navigate('/board'); 
    } catch (err) {
      setError(err.response?.data?.message || `${isRegister ? 'Registration' : 'Login'}`);
    } finally{
      setLoading(false);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="login-form">
    //   <h2>{isRegister ? 'Register' : 'Login'}</h2>

    <div>

      {loading ? (
        <div className='spinner'></div>
      ):(
        <form onSubmit={handleSubmit} className ='login-form'>

          <h2>{isRegister ? 'Register' : 'Login'}</h2>
     

       {isRegister && (
        <>
        <input
          className='input-register'
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />

  <div className="role-section">
    <p>Choose Your Role</p>
    {roleOptions.map((role) => (
      <label key={role} className="role-option">
        <input
          className="input-role"
          type="radio"
          name="role"
          value={role}
          checked={form.role === role}
          onChange={handleChange}
        />
        {role}
      </label>
    ))}
  </div>

  {/* <div className='photo-selection'>
    <p>Choose Your Photo</p>
    <input 
        className='input-image'
        type='file'
        name='image'
        accept='image/*'
        onChange={(e) => setForm({...form, image: e.target.files[0]})}
      />
  </div> */}

  <div className='photo-selection'>
  <p>Choose Your Avatar</p>
  <div className="avatar-options">
    {['avatar1.png', 'avatar2.png'].map((avatar, idx) => {
      const avatarPath = `/avatars/${avatar}`;
      return (
        <img
          key={idx}
          src={avatarPath}
          alt={`Avatar ${idx + 1}`}
          className={`avatar-image ${form.image === avatarPath ? 'selected' : ''}`}
          onClick={() => setForm({ ...form, image: avatarPath })}
        />
      );
    })}
  </div>
</div>

</>

      )}


      <input
        className="input-email"
        type="text"
        name="partner_number"
        placeholder="Partner Number"
        value={form.partner_number}
        onChange={handleChange}
        required
      /><br />

      <input
        className="input-password"
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      /><br />

     


      <button className='login-button' type="submit">{isRegister ? 'Register' : 'Login'}</button>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

       <p style={{ marginTop: '10px' }}>
        {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span
          style={{ color: '#006142', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setIsRegister(prev => !prev)}
        >
          {isRegister ? 'Login' : 'Register'}
        </span>
      </p>
    </form>
//   );
// };
      )}
    </div>
    );
  };

export default LoginForm;
