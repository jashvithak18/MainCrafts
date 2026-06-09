import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setUser(data);
        }
      } catch (err) {
        setError('Failed to load profile details');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) {
    return (
      <div className="auth-container">
        <div className="alert alert-danger">{error}</div>
        <button onClick={handleLogout} className="logout-btn">
          Back to Login
        </button>
      </div>
    );
  }

  if (!user) {
    return <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Loading profile...</div>;
  }

  const avatarLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="dashboard-card">
      <div className="user-avatar">{avatarLetter}</div>
      <h2 style={{ marginBottom: '0.25rem' }}>Welcome, {user.name}!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        Successfully authenticated with JSON Web Token.
      </p>

      <div className="info-group">
        <div className="info-item">
          <span className="info-label">Name</span>
          <span className="info-value">{user.name}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Email</span>
          <span className="info-value">{user.email}</span>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
