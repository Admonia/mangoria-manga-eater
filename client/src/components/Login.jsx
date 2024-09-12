import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      setLoading(true); // Set loading to true to disable the button and show feedback
      setError(null); // Clear any previous errors
      setSuccessMessage(null); // Clear any previous success messages

      // Send the login request to the backend
      const response = await fetch('http://localhost:8089/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Add credentials to handle cookies if using JWT with cookies
        body: JSON.stringify({ username, password }),
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json(); // Parse JSON response for error message
        console.error('Login Error:', errorData); // Log error data
        throw new Error(errorData.error || 'Login failed. Please try again.');
      }

      // Assuming the backend sends a JWT token or sets cookies
      const responseData = await response.json(); // Get any additional data sent from backend
      console.log('Login successful, data received:', responseData);

      setSuccessMessage('Login successful!'); // Set the success message
      setError(null); // Clear error
      setUsername(''); // Clear username input
      setPassword(''); // Clear password input

      // Optional: Redirect or save token in localStorage
      // localStorage.setItem('token', responseData.token);
      // window.location.href = '/dashboard';
    } catch (error) {
      console.error('Catch Error:', error); // Log any caught errors
      setError(error.message || 'An error occurred. Please try again later.');
      setSuccessMessage(null); // Clear success message on error
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
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
//     e.preventDefault(); // Prevent the default form submission behavior

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('http://localhost:8089/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Login failed. Please try again.');
//       }

//       setSuccessMessage('Login successful!');
//       setError(null);
//       setUsername(''); // Clear inputs after success
//       setPassword('');
//     } catch (error) {
//       console.error(error);
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
//     e.preventDefault(); // Prevent the default form submission behavior

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch('http://localhost:8089/api/users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Login failed. Please try again.');
//       }

//       setSuccessMessage('Login successful!');
//       setError('');
//       setUsername(''); // Clear inputs after success
//       setPassword('');
//     } catch (error) {
//       console.error(error);
//       setError(error.message || 'An error occurred. Please try again later.');
//       setSuccessMessage('');
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



// const LoginForm = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const login = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/users/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           user: {
//             username,
//             password
//           }
//         })
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleLoginSubmit = async (event) => {
//     event.preventDefault();

//     const loginResult = await login();

//     if (loginResult) {
//       if (loginResult.success) {
//         setError('');
//         setLoginSuccess(true);
//       } else {
//         setError(loginResult.error.message);
//         setLoginSuccess(false);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}
//       {loginSuccess && <p>Login is a success!</p>}
//       <form onSubmit={handleLoginSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
