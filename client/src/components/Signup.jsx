import React, { useState } from 'react';

const signUp = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = async () => {
    try {
      // Make a POST request to your backend registration endpoint
      const response = await fetch('http://localhost:8089/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Registration successful, parse the response to obtain the token
        const data = await response.json();
        return { success: true, token: data.token };
      } else {
        // Registration failed, parse the error message from the response
        const errorData = await response.json();
        return { success: false, error: errorData.message };
      }
    } catch (err) {
      console.error(err);
      // Handle any network or other errors
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registrationResult = await registerUser();

    if (registrationResult.success) {
      setError('');

      // Handle successful registration and authentication here
      const { token } = registrationResult;
      onSignup(username, token); // Pass the username and token to the parent component
    } else {
      setError(registrationResult.error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default signUp;




