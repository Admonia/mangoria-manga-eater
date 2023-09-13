import React, { useState } from 'react';

const SignUpForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const registerUser = async () => {
    try {
      // Implement registration logic here
      const registrationResult = { success: true };
      return registrationResult;
    } catch (err) {
      console.error(err);
      // Handle any registration errors and return an appropriate error object
      // For simplicity, I'm assuming an error registration returns { success: false, error: { message: 'Registration failed' } }
      return { success: false, error: { message: 'Registration failed' } };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const registrationResult = await registerUser();

    if (registrationResult.success) {
      setError('');

      // Handle successful registration here
      onSignup(username); // Pass the username to the parent component or handle it as needed
    } else {
      setError(registrationResult.error.message);
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

export default SignUpForm;

