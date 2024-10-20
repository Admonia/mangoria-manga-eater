



















// import React, { useState } from 'react';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the password being sent for debugging
//     console.log('Password being sent for login:', password);

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       const response = await fetch('http://localhost:8089/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',
//         body: JSON.stringify({ username, password }),
//       });

//       console.log('Login Response status:', response.status); // Added logging

//       if (response.status === 401) {
//         const errorData = await response.json();
//         console.error('Login Error:', errorData.error);
//         setError(errorData.error || 'Invalid username or password.');
//       } else if (!response.ok) {
//         setError('An unexpected error occurred.');
//       } else {
//         const responseData = await response.json();
//         console.log('Login successful:', responseData);

//         setSuccessMessage('Login successful!');
//         setUsername('');
//         setPassword('');

//         // Optionally: Redirect after login
//         window.location.href = '/dashboard'; // Adjust this as needed
//       }
//     } catch (err) {
//       console.error('Error during login request:', err);
//       setError(err.message || 'An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;













// import React, { useState } from 'react';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Log the password being sent for debugging
//     console.log('Password being sent for login:', password);

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       const response = await fetch('http://localhost:8089/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // This sends cookies with the request (if needed)
//         body: JSON.stringify({ username, password }),
//       });

//       if (response.status === 401) {
//         const errorData = await response.json();
//         console.error('Login Error:', errorData.error);
//         setError(errorData.error || 'Invalid username or password.');
//       } else if (!response.ok) {
//         setError('An unexpected error occurred.');
//       } else {
//         const responseData = await response.json();
//         console.log('Login successful:', responseData);

//         setSuccessMessage('Login successful!');
//         setUsername('');
//         setPassword('');

//         // Optionally: Redirect after login
//         // window.location.href = '/dashboard'; // Adjust this as needed
//       }
//     } catch (err) {
//       console.error('Error during login request:', err);
//       setError(err.message || 'An error occurred. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </form>
//     </div>
//   );
// }

// export default Login;











