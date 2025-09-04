import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';
import axios from '../services/Axios';

export default function LoginPage() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/v1/auth/login', { email, password });

      const token = res.data.access_token;
      if (token) {
        localStorage.setItem('token', token);
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'ADMIN') {
          navigate('/admin/admindashboard');
        } else if (role === 'FLIGHT_OWNER') {
          navigate('/owner/flightownerdashboard');
        } else {
          navigate('/user/userdashboard');
        }

      } 

      else {
        setError('Invalid response from server.');
      }

    } 
    catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
    } 
    finally {
      setLoading(false);
    }
  };

  return (

    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: '80px'
      }}
    >

      <div className="text-center p-4 rounded" style={{ minWidth: '320px', color: 'white' }}>
        <h2 className="mb-4" style={{ color: 'black' }}>Welcome to SimplyFly</h2>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />


        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />


        <button
          className="btn btn-outline-light w-100"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="text-danger mt-2">{error}</div>}
      </div>
      
    </div>
  );
}
