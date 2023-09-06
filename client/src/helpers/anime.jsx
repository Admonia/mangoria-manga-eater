// users fetch requests

const baseUrl = 'http://localhost:8089';

export async function fetchAllUsers() {
    try {
        const response = await fetch(`${baseUrl}/api/users`);
        const returnVal = await response.json();
        return returnVal;
    } catch(err) {
        console.log(err);
        return err;
    }
}