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

      const endpoint = isLogin ? 'auth/login' : 'auth/register'; 
      const url = `http://localhost:8089/api/${endpoint}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Do not log sensitive data
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Operation failed. Please try again.');
        return;
      }

      const data = await response.json(); 
      // Handle successful response without logging sensitive data
      setSuccessMessage(isLogin ? 'Login successful!' : 'Registration successful!');
      setUsername('');
      setPassword('');

      if (isLogin) {
        window.location.href = '/dashboard'; 
      }
    } catch (error) {
      setError(error.message || 'An error occurred. Please try again later.');
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
            setError(null);
            setSuccessMessage(null);
          }}
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Signup;


























// import React, { useState } from 'react';

// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       const endpoint = isLogin ? 'auth/login' : 'auth/register'; 
//       const url = `http://localhost:8089/api/${endpoint}`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       console.log('Response status:', response.status);
//       console.log('Response URL:', response.url);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error Data:', errorData);
//         throw new Error(errorData.error || 'Operation failed. Please try again.');
//       }

//       const data = await response.json(); 

//       if (isLogin) {
//         localStorage.setItem('token', data.token); 
//         setSuccessMessage('Login successful!');
//       } else {
//         setSuccessMessage('Registration successful!');
//       }

//       setError(null);
//       setUsername('');
//       setPassword('');

//       if (isLogin) {
//         window.location.href = '/dashboard'; 
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
//           {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </form>

//       <p>
//         {isLogin ? "Don't have an account? " : 'Already have an account? '}
//         <button
//           type="button"
//           onClick={() => {
//             setIsLogin(!isLogin);
//             setError(null);
//             setSuccessMessage(null);
//           }}
//         >
//           {isLogin ? 'Register' : 'Login'}
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Signup;













// import React, { useState } from 'react';

// function Signup() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isLogin, setIsLogin] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username || !password) {
//       setError('Please enter both username and password.');
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       setSuccessMessage(null);

//       const endpoint = isLogin ? 'auth/login' : 'auth/register'; 
//       const url = `http://localhost:8089/api/${endpoint}`;
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       console.log('Response status:', response.status);
//       console.log('Response URL:', response.url);

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Error Data:', errorData);
//         throw new Error(errorData.error || 'Operation failed. Please try again.');
//       }

//       const data = await response.json(); 

//       if (isLogin) {
//         localStorage.setItem('token', data.token); 
//         setSuccessMessage('Login successful!');
//       } else {
//         setSuccessMessage('Registration successful!');
//       }

//       setError(null);
//       setUsername('');
//       setPassword('');

//       if (isLogin) {
//         window.location.href = '/dashboard'; 
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
//           {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Register'}
//         </button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       </form>

//       <p>
//         {isLogin ? "Don't have an account? " : 'Already have an account? '}
//         <button
//           type="button"
//           onClick={() => {
//             setIsLogin(!isLogin);
//             setError(null);
//             setSuccessMessage(null);
//           }}
//         >
//           {isLogin ? 'Register' : 'Login'}
//         </button>
//       </p>
//     </div>
//   );
// }

// export default Signup;















