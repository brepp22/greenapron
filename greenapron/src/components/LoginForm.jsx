

// export default LoginForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm = ({ setToken }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    partner_number: '',
    password: '',
    role: '',
    image: ''
  });

  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
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

    const endpoint = isRegister
      ? 'https://backend-greenapron.onrender.com/api/users/register'
      : 'https://backend-greenapron.onrender.com/api/users/login';

    const payload = isRegister
      ? form
      : { partner_number: form.partner_number, password: form.password };

    try {
      const res = await axios.post(endpoint, payload);
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      navigate('/board');
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${isRegister ? 'register' : 'login'}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="form-title">{isRegister ? 'Create Your Account' : 'Welcome Back'}</h2>

        {isRegister && (
          <>
            {/* --- NAME SECTION --- */}
            <div className="form-section">
              <h3>Personal Info</h3>
              <div className="name-fields">
                <div className="input-group">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    className="input-field"
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={form.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    className="input-field"
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={form.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* --- ROLE SELECTION --- */}
            <div className="form-section">
              <h3>Your Role</h3>
              <div className="role-options">
                {roleOptions.map((role) => (
                  <label key={role} className="role-option">
                    <input
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
            </div>

            {/* --- AVATAR SELECTION --- */}
            <div className="form-section">
              <h3>Choose Your Avatar</h3>
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

        {/* --- LOGIN FIELDS (shared) --- */}
        <label htmlFor="partner_number">Partner Number</label>
        <input
          className="input-field"
          type="text"
          name="partner_number"
          placeholder="Partner Number"
          value={form.partner_number}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button className="login-button" type="submit" disabled={loading}>
          {loading
            ? isRegister
              ? 'Creating Account...'
              : 'Logging In...'
            : isRegister
            ? 'Register'
            : 'Login'}
        </button>

        <p className="toggle-text">
          {isRegister ? 'Already have an account?' : "Don’t have an account?"}{' '}
          <span
            className="toggle-link"
            onClick={() => {
              setForm({
                first_name: '',
                last_name: '',
                partner_number: '',
                password: '',
                role: '',
                image: ''
              });
              setIsRegister((prev) => !prev);
              setError('');
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
