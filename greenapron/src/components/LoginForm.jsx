import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({setToken}) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = isRegister ?
      'http://localhost:8080/api/users/register' :
      'http://localhost:8080/api/users/login';


    try {
      const res = await axios.post(endpoint, form);
      console.log(`${isRegister ? 'Registration' : 'Login'}`, res.data.token); 
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token); 
      navigate('/board'); 
    } catch (err) {
      setError(err.response?.data?.message || `${isRegister ? 'Registration' : 'Login'}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>

      <input
        className="input-email"
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
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
  );
};

export default LoginForm;
