import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const response = await fetch('http://localhost:8089/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login Error:', errorData);
        throw new Error(errorData.error || 'Login failed. Please try again.');
      }

      const responseData = await response.json();
      console.log('Login successful:', responseData);

      setSuccessMessage('Login successful!');
      setUsername('');
      setPassword('');

      // Optionally: Redirect after login
      window.location.href = '/dashboard'; // Adjust this as needed

    } catch (error) {
      console.error('Catch Error:', error);
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
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
}

export default Login;





















// import React, { useState } from 'react';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Check for empty fields
//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       // Send the login request to the backend
//       const response = await fetch('http://localhost:8089/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Needed for handling cookies with JWT
//         body: JSON.stringify({ username, password }),
//       });

//       // Check if response is JSON
//       if (response.headers.get('content-type')?.includes('application/json')) {
//         const responseData = await response.json();

//         // Handle unsuccessful response
//         if (!response.ok) {
//           console.error('Login Error:', responseData);
//           throw new Error(responseData.error || 'Login failed. Please try again.');
//         }

//         console.log('Login successful, data received:', responseData);

//         setSuccessMessage('Login successful!');
//         setUsername('');
//         setPassword('');

//         // Optionally: Redirect after login or store token
//         // localStorage.setItem('token', responseData.token);
//         // window.location.href = '/dashboard';
//       } else {
//         throw new Error('Unexpected response format. Please try again.');
//       }
//     } catch (error) {
//       console.error('Catch Error:', error);
//       setError(error.message || 'An error occurred. Please try again later.');
//       setSuccessMessage(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="username">
//           Username:
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             aria-label="Enter your username"
//           />
//         </label>
//         <br />
//         <label htmlFor="password">
//           Password:
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             aria-label="Enter your password"
//           />
//         </label>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {error && (
//           <p style={{ color: 'red' }} role="alert" aria-live="assertive">
//             {error}
//           </p>
//         )}
//         {successMessage && (
//           <p style={{ color: 'green' }} role="status" aria-live="polite">
//             {successMessage}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }

// export default Login;













