import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const storedUsername = localStorage.getItem('username') || 'User';
  const storedEmail = localStorage.getItem('email') || '';

  const [formData, setFormData] = useState({
    email: storedEmail,
    phone: '',
    address: '',
    height: '',
    weight: '',
    shape: 'Fit',
  });

  const [response, setResponse] = useState('');
  const navigate = useNavigate();

  // ✅ Fetch existing profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://tx475zwk-3000.inc1.devtunnels.ms/auth/profile/${storedEmail}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            email: data.user.email,
            phone: data.user.phone || '',
            address: data.user.address || '',
            height: data.user.height || '',
            weight: data.user.weight || '',
            shape: data.user.shape || 'Fit',
          });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    if (storedEmail) {
      fetchProfile();
    }
  }, [storedEmail]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://tx475zwk-3000.inc1.devtunnels.ms/auth/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setResponse('✅ Profile saved successfully!');
        setTimeout(() => navigate('/scan'), 1500);
      } else {
        setResponse(`❌ ${data.error}`);
      }
    } catch (err) {
      setResponse(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
        <h3 className="text-center mb-3">Hello, {storedUsername} 👋</h3>
        <p className="text-center mb-4">Please complete your profile</p>

        <form onSubmit={handleSaveProfile}>
          <div className="mb-3">
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="height"
              className="form-control"
              placeholder="Height (cm)"
              value={formData.height}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              name="weight"
              className="form-control"
              placeholder="Weight (kg)"
              value={formData.weight}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">How do you describe your shape?</label>
            <select
              name="shape"
              className="form-select"
              value={formData.shape}
              onChange={handleChange}
            >
              <option value="Thin">Thin</option>
              <option value="Fit">Fit</option>
              <option value="Fat">Fat</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Save Profile
          </button>
        </form>
        {response && <div className="mt-3 text-center">{response}</div>}
      </div>
    </div>
  );
}
