// helpers/users.js

const baseUrl = 'http://localhost:8089';

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${baseUrl}/api/users`);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Re-throw the error to handle it in your component
  }
}


// // users fetch requests

// const baseUrl = 'http://localhost:8089';

// export async function fetchAllUsers() {
//     try {
//         const response = await fetch(`${baseUrl}/api/users`);
//         const returnVal = await response.json();
//         return returnVal;
//     } catch(err) {
//         console.log(err);
//         return err;
//     }
// }

