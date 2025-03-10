const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

Model.makeConnection();

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// Show all movies and provide link to add a new movie
app.get('/', async function(req, res) {
    const movies = await Model.getAllMovies(); // Get all movies
    res.render('movie_page', { movies: movies });
  });


// Start the server
app.listen(3000, function() { 
    console.log("Server listening on port 3000..."); 
});