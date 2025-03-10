const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

Model.makeConnection();

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// Show all movies and provide link to add a new movie
app.get('/', async (req, res) => {
    const { rating, genre, search } = req.query;
    let reviews;

    // Get the unique genres to show in the filter dropdown
    const genres = await Model.getGenres();

    if (rating || genre) {
        reviews = await Model.getFilteredReviews(rating, genre, search);
    } else {
        reviews = await Model.getAllReviews();
    }

    // Modify the reviews data to include stars array and ensure `favourite` is a boolean
    const reviewsWithStars = reviews.map(review => {
        return {
            ...review,
            stars: Array(review.rating).fill(1),  // Create an array with `rating` number of stars
            favourite: review.favourite === 1  // Ensure `favourite` is a boolean
        };
    });

    // Prepare data for rendering (handle 'selected' logic for rating and genre in backend)
    const ratingSelected = {
        1: rating === '1' ? 'selected' : '',
        2: rating === '2' ? 'selected' : '',
        3: rating === '3' ? 'selected' : '',
        4: rating === '4' ? 'selected' : '',
        5: rating === '5' ? 'selected' : ''
    };

    // Pass the genres and selected genre to the template
    const genreSelected = genres.map(g => ({
        genre: g,
        selected: genre === g ? 'selected' : ''
    }));

    res.render('main_page', { reviews: reviewsWithStars, genres: genreSelected, search, ratingSelected });
});

// Show form to add a new review
app.get('/addform', (req, res) => {
    res.render('add_movie');
});
 
// Handle adding a new review
app.post('/addreview', async (req, res) => {
    const { moviename, genre, review, date_watched, rating, favourite } = req.body;
    const newReview = { 
        moviename, 
        genre, 
        review, 
        date_watched, 
        rating, 
        favourite: favourite === 'on' ? 1 : 0  // Convert `favourite` to 1 or 0
    };
    await Model.addReview(newReview);
    res.redirect('/');
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