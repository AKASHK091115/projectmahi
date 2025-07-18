import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
export default function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setResponse(`✅ Registered as ${data.user.username}`);
        navigate('/login');
      } else {
        setResponse(`❌ ${data.error}`);
      }
    } catch (err) {
      setResponse(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
        {response && <div className="mt-2 text-center">{response}</div>}
      </div>
    </div>
  );
}