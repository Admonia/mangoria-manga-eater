import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const endpoint = isLogin ? 'login' : 'register';
      const response = await fetch(`http://localhost:8089/api/users/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      console.log('Response status:', response.status); // Log the response status
      console.log('Response URL:', response.url); // Log the response URL

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error Data:', errorData); // Log the error data
        throw new Error(errorData.error || 'Operation failed. Please try again.');
      }

      const data = await response.json(); // Get the token or user info

      if (isLogin) {
        // Handle the token for login
        localStorage.setItem('token', data.token); // Store token in local storage or as needed
        setSuccessMessage('Login successful!');
      } else {
        setSuccessMessage('Registration successful!');
      }

      setError(null);
      setUsername('');
      setPassword('');

      // Redirect or navigate after login or registration
      if (isLogin) {
        // For example, redirect to a dashboard
        window.location.href = '/dashboard'; // Optional
      }
    } catch (error) {
      console.error('Catch Error:', error); // Log any caught errors
      setError(error.message || 'An error occurred. Please try again later.');
      setSuccessMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>

      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null); // Clear any error message when switching modes
            setSuccessMessage(null); // Clear success message when switching modes
          }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Signup;











