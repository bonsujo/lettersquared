const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("movies.db")

db.serialize(function(){
    db.run("DROP TABLE IF EXISTS Reviews");
    db.run(`CREATE TABLE IF NOT EXISTS Reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        moviename TEXT NOT NULL,
        genre TEXT,
        review TEXT,
        date_watched DATE,
        rating REAL,
        favourite INTEGER
      )`);


      db.serialize(function(){
        db.run("DROP TABLE IF EXISTS Reviews");
        db.run(`CREATE TABLE IF NOT EXISTS Reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            moviename TEXT NOT NULL,
            genre TEXT,
            review TEXT,
            date_watched DATE,
            rating REAL,
            favourite INTEGER
        )`);
    
        db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['John Wick','Action','Why did they kill the dog!', '2021-11-29','5', 1 ]);
        db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Maze Runner','Action','Dylan O Brien is a heartthrob <3', '2025-02-24','4', 0 ]);
        db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Memories of a Murder','Thriller','I am rattled, amazing movie', '2013-02-11','5', 1 ]);
        db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Companion','Action','Great twist, did not know she was a robot', '2025-02-15','4', 0 ]);
    });

})