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
    const results = await db.all("SELECT rowid, * FROM Movies");
    return results;
}

// Insert a new movie into the database
async function addMovie(moviename, genre, review, date, rating, favourite) {
    await db.run("INSERT INTO Movies (moviename, genre, review, date, rating, favourite) VALUES (?, ?, ?, ?, ?, ?)", [moviename, genre, review, date, rating, favourite]);
}

 // Delete a movie by ID
async function deleteMovie(id) {
    await db.run("DELETE FROM Movies WHERE rowid = ?", [id]);
  }

module.exports = { makeConnection, getAllMovies, deleteMovie, addMovie};
