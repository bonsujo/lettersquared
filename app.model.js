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