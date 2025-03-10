const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("movies.db")

db.serialize(function(){
    db.run("DROP TABLE IF EXISTS Reviews");
  db.run(`
    CREATE TABLE Reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,  
    moviename TEXT NOT NULL,               
    genre TEXT NOT NULL,                   
    review TEXT,                          
    date_watched DATE NOT NULL,             
    user_rating REAL NOT NULL,                
    favourite INTEGER NOT NULL        
    )
  `);

    // Initial Data
  db.run("INSERT INTO Reviews (movieTitle, reviewerName, rating, reviewText, reviewDate) VALUES (?,?,?,?,?)", 
  ['Inception', 'John Doe', 5, 'Amazing movie!', '2025-02-24']);
  db.run("INSERT INTO Reviews (movieTitle, reviewerName, rating, reviewText, reviewDate) VALUES (?,?,?,?,?)", 
  ['Titanic', 'Jane Smith', 4, 'A classic!', '2025-02-23']);

})