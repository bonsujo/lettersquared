const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("movies.db")

db.serialize(function(){
    db.run("DROP TABLE IF EXISTS Movies");
    db.run("CREATE TABLE Movies (moviename TEXT, genre TEXT, review TEXT, date TEXT, rating INTEGER, favourite INTEGER )");

    db.run("INSERT INTO Movies VALUES (?,?,?,?,?,?)", ['John Wick','Action','Why did they kill the dog!', 'November 29, 2021','5', '1' ]);
    db.run("INSERT INTO Movies VALUES (?,?,?,?,?,?)", ['Maze Runner','Action','Dylan O Brien is a heartthrob <3', 'July 24, 2014','4', '0' ]);
    db.run("INSERT INTO Movies VALUES (?,?,?,?,?,?)", ['Memories of a Murder','Thriller','I am rattled, amazing movie', 'December 15, 2013','5', '1' ]);
    db.run("INSERT INTO Movies VALUES (?,?,?,?,?,?)", ['Companion','Action','Great twist, did not know she was a robot', 'February 22, 2025','4', '0' ]);

})