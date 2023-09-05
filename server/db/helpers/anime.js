const client = require('../client')

const createAnime = async ({ name, description }) => {
    try {
        const {
            rows: [anime],
       
        } = await client.query (
         
            `
                INSERT INTO anime(name, description)
                VALUES($1, $2)
                RETURNING *;
            `,
            [name, description]
        )
        console.log(anime)
        return anime
    } catch (error) {
        throw error
    }
}
const getAllAnime = async () => {
    try {
        const { rows }
         = await client.query(`
            SELECT *
            FROM anime;
        `)
        return rows
    } catch (error) {
        throw error
    }
}

const getAnimeById = async (animeId) => {
    try {
      const query = {
        text: 'SELECT * FROM anime WHERE "animeId" = $1',
        values: [animeId], // Pass the userId as a parameter
      };
  
      const { rows } = await client.query(query);
  
      if (rows.length === 0) {
        return null; // User not found
      }
  
      return rows[0]; // Return the first user found (assuming userId is unique)
    } catch (error) {
      throw error;
    }
  };
  const updateAnime = async (animeId, { name, description }) => {
    try {
      const query = {
        text: 'UPDATE anime SET name = $2, description = $3 WHERE "animeId" = $1 RETURNING *',
        values: [animeId, name, description],
      };
  
      const { rows } = await client.query(query);
  
      if (rows.length === 0) {
        return null; // User not found
      }
  
      return rows[0]; // Return the updated user
    } catch (error) {
      throw error;
    }
  };

//   UPDATE anime
// SET name = 'Hells Paradise', description = 'An assassin with a beating heart, the man loves his wife. Thrust into a garden filled with creatures from HELL he must survive to be pardoned and return home to the woman he loves.'
// WHERE "animeId" = 1
// RETURNING *;
  
  const deleteAnime = async (animeId) => {
    try {
      const {
        rows: [deletedAnime],
      } = await client.query(
        `
        DELETE FROM anime
        WHERE "animeId" = $1
        RETURNING *;
        `,
        [animeId]
      );
  
      if (!deletedPost) {
        console.error(`Anime with ID ${animeId} not found`);
        return null; // Handle the case when the user doesn't exist
      }
  
      console.log(`Deleted anime with ID ${animeId}`);
      return deletedAnime;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };
  
  

module.exports = { createAnime, getAllAnime, getAnimeById, updateAnime, deleteAnime }