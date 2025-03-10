const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const Model = require('./app.model'); 




app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Show all reviews with filters for Rating and Genre
app.get('/', async (req, res) => {
    const { rating, genre, search } = req.query;
    let reviews;

    // Get the unique genres to show in the filter dropdown
    const genres = await Model.getGenres();

    // Fetch filtered or all reviews
    if (rating || genre) {
        reviews = await Model.getFilteredReviews(rating, genre, search);
    } else {
        reviews = await Model.getAllReviews();
    }

    // Modify the reviews data to include stars array and ensure `favourite` is a boolean
    const reviewsWithStars = reviews.map(review => {
        return {
            ...review,
            stars: Array(review.rating).fill(1),  
            favourite: review.favourite === 1  
        };
    });

    
    const ratingSelected = {
        1: rating === '1' ? 'selected' : '',
        2: rating === '2' ? 'selected' : '',
        3: rating === '3' ? 'selected' : '',
        4: rating === '4' ? 'selected' : '',
        5: rating === '5' ? 'selected' : ''
    };

    // Map genres correctly if they are objects like { genre: 'Action' }
    const genreSelected = genres.map(g => ({
        genre: g.genre || g,  // Adjust based on the structure of each genre
        selected: genre === g.genre || genre === g ? 'selected' : ''
    }));

    // Pass the data to the Mustache template
    res.render('main_page', { reviews: reviewsWithStars, genres: genreSelected, search, ratingSelected });
});

// Toggle favorite status
app.get('/togglefavorite/:id', async (req, res) => {
    await Model.toggleFavorite(req.params.id);
    res.redirect('/');
});

// Show form to add a new review
app.get('/addform', (req, res) => {
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance']; // Define the genres array
    res.render('add_form', { genres: genres }); // Pass genres to the template
});

// add review
app.post('/addreview', async (req, res) => {
    const { moviename, review, date_watched, rating, genre, favourite } = req.body;

    let errors = [];

    // Validate Movie Title (must be at least 3 characters long)
    if (!moviename || moviename.trim().length < 3) {
        errors.push('Movie title must be at least 3 characters long.');
    }

    // Validate Review (must be at least 6 characters long)
    if (!review || review.trim().length < 6) {
        errors.push('Review must be at least 6 characters long.');
    }

    // Validate Date Watched
    if (!date_watched) {
        errors.push('Please select a valid date.');
    }

    // Validate Rating (must be a valid rating)
    if (!rating || !['1', '2', '3', '4', '5'].includes(rating)) {
        errors.push('Please select a valid rating.');
    }

    // If there are errors, send them back to the user
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Capture the `favourite` field, default to `0` if not provided
    const favouriteValue = favourite === '1' ? 1 : 0;

    // Save to the database
    await Model.addReview({ moviename, review, date_watched, rating, genre, favourite: favouriteValue });

    // Redirect to the movie list page after adding the review
    res.redirect('/');
});


// Show form to update a review
app.get('/updateform/:id', async (req, res) => {
    const review = await Model.getReviewById(req.params.id);
    res.render('update_form', { review });
});

// Handle updating a review
app.post('/updatereview/:id', async (req, res) => {
    const { moviename, genre, review, date_watched, rating, favourite } = req.body;
    const updatedReview = { 
        moviename, 
        genre, 
        review, 
        date_watched, 
        rating, 
        favourite: favourite === 'on' ? 1 : 0  // Convert `favourite` to 1 or 0
    };
    await Model.updateReview(updatedReview, req.params.id);
    res.redirect('/');
});

// Handle deleting a review
app.get('/deletereview/:id', async (req, res) => {
    await Model.deleteReview(req.params.id);
    res.redirect('/');
});

// Delete all reviews
app.post('/deleteall', async (req, res) => {
    await Model.deleteAllReviews();
    res.redirect('/');
});

console.log('Database Path:', __dirname + '/reviews.db');

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});