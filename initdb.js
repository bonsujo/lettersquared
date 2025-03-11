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
    
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['John Wick', 'Action', 'Why did they kill the dog!', '2021-11-29', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Maze Runner', 'Action', 'Dylan O Brien is a heartthrob <3', '2025-02-24', '4', 0 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Memories of a Murder', 'Thriller', 'I am rattled, amazing movie', '2013-02-11', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Companion', 'Action', 'Great twist, did not know she was a robot', '2025-02-15', '4', 0 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['The Shawshank Redemption', 'Drama', 'A true masterpiece, incredible story', '1994-09-22', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Inception', 'Sci-Fi', 'Mind-bending, never seen anything like it', '2010-07-16', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Titanic', 'Romance', 'Heartbreaking, a true classic', '1997-12-19', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['The Godfather', 'Crime', 'A cinematic masterpiece', '1972-03-24', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['The Dark Knight', 'Action', 'Ledger’s Joker is unmatched', '2008-07-18', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['The Lion King', 'Animation', 'A childhood favorite', '1994-06-15', '4', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Avengers: Endgame', 'Action', 'Epic conclusion to the saga', '2019-04-26', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Frozen', 'Animation', 'Great music and a fun adventure', '2013-11-27', '4', 0 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['The Matrix', 'Sci-Fi', 'A revolutionary film in every sense', '1999-03-31', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Gladiator', 'Action', 'Powerful and intense', '2000-05-05', '5', 1 ]);
    db.run("INSERT INTO Reviews (moviename, genre, review, date_watched, rating, favourite) VALUES (?,?,?,?,?,?)", ['Black Panther', 'Action', 'A visual and cultural milestone', '2018-02-16', '5', 1 ]);

        
    });

})