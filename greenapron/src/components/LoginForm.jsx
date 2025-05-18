import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');


    try {
      const res = await axios.post('http://localhost:8080/api/users/login', form);
      console.log('Login success, token:', res.data.token); // Add this
      localStorage.setItem('token', res.data.token);
      navigate('/board'); // redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

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

      <button className='login-button' type="submit">Login</button>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
