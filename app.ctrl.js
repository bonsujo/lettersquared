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

//Handle adding a new movie (form submission)
app.get('/addmovie', async function(req, res) {
    // Insert the movie into the database using form data
    await Model.addMovie(req.query); 
  
    // Get updated list of movies
    const movies = await Model.getAllMovies(); 
  
    // Render the page with the updated movies list
    res.render('movie_page', { movies: movies });
  });

// Handle deleting a movie
app.get('/delete-movie/:id', async function(req, res) {
// Delete the movie with the given ID
await Model.deleteMovie(req.params.id); 

// Get updated list of movies
const movies = await Model.getAllMovies(); 

// Render the page with the updated movies list
res.render('movie_page', { movies: movies });
});

// Start the server
app.listen(3000, function() { 
    console.log("Server listening on port 3000..."); 
});