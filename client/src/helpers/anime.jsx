const baseUrl = 'http://localhost:8089';

export async function fetchAllAnime() {
    try {
        const response = await fetch(`${baseUrl}/api/anime`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw error; // Re-throw the error to handle it in your component
    }
}