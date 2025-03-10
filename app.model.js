const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

let db;

async function makeConnection() {
    db = await sqlite.open({
        filename: 'movies.db',
        driver: sqlite3.Database
    });
}
//test
// Get all movies
async function getAllMovies() {
    const results = await db.all("SELECT rowid, * FROM Reviews");
    return results;
}

async function getGenres() {
    const results = await db.all("SELECT DISTINCT genre FROM Reviews");
    return results;
  }

  // Get filtered reviews
async function getFilteredReviews(rating, genre) {
    let query = 'SELECT * FROM Reviews WHERE 1=1';
    const params = [];
  
    if (rating) {
      query += ' AND rating = ?';
      params.push(rating);
    }
    if (genre) {
      query += ' AND genre = ?';
      params.push(genre);
    }
  
    const rows = await db.all(query, params);
    return rows;
  }
  
  async function toggleFavorite(id) {
    const review = await db.get('SELECT favourite FROM Reviews WHERE id = ?', [id]);
    const newStatus = review.favourite ? 0 : 1;
    await db.run('UPDATE Reviews SET favourite = ? WHERE id = ?', [newStatus, id]);
  }
  

// Add a new review
async function addReview(review) {
    await db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)",
      [review.moviename, review.genre, review.review, review.date_watched, review.rating, review.favourite]);
  }

 // Delete a movie by ID
async function deleteMovie(id) {
    await db.run("DELETE FROM Reviews WHERE rowid = ?", [id]);
  }

module.exports = { makeConnection, getAllMovies, deleteMovie, addReview, getGenres, toggleFavorite} ;
