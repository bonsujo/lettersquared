const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

let db;

// Open the database connection once and return it
async function makeConnection() {
  if (!db) {
    db = await sqlite.open({
      filename: 'movies.db',
      driver: sqlite3.Database
    });
  }
  return db;
}
// Get all reviews
async function getAllReviews() {
  const db = await makeConnection(); 
  const results = await db.all("SELECT rowid, * FROM Reviews");
  return results;
}

async function getGenres() {
  const db = await makeConnection(); 
  const results = await db.all("SELECT DISTINCT genre FROM Reviews");
  return results;
}

// Get filtered reviews
async function getFilteredReviews(rating, genre) {
  const db = await makeConnection();
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
  const db = await makeConnection(); 
  const review = await db.get('SELECT favourite FROM Reviews WHERE id = ?', [id]);
  const newStatus = review.favourite ? 0 : 1;
  await db.run('UPDATE Reviews SET favourite = ? WHERE id = ?', [newStatus, id]);
}

// Get a single review by id
async function getReviewById(id) {
  const db = await makeConnection(); 
  const result = await db.get("SELECT * FROM Reviews WHERE id = ?", id);
  return result;
}

// Add a new review
async function addReview(review) {
  const db = await makeConnection(); 
  await db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)",
    [review.moviename, review.genre, review.review, review.date_watched, review.rating, review.favourite]);
}

// Update an existing review
async function updateReview(review, id) {
  const db = await makeConnection(); 
  
  await db.run("UPDATE Reviews SET review = ?, rating = ?, favourite = ? WHERE id = ?",
    [review.review, review.rating, review.favourite, id]);
}

// Delete a review by id
async function deleteReview(id) {
  const db = await makeConnection(); 
  await db.run("DELETE FROM Reviews WHERE id = ?", id);
}

// Delete all reviews
async function deleteAllReviews() {
  const db = await makeConnection(); 
  await db.run('DELETE FROM Reviews');
}

module.exports = { getAllReviews, getReviewById, addReview, updateReview, deleteReview, getFilteredReviews, toggleFavorite, deleteAllReviews, getGenres };
