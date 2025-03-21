const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const Model = require('./app.model'); 


app.use(express.static('public'));

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

// Show all reviews with filters for Rating and Genre
app.get('/', async (req, res) => {
    const { rating, genre, sort } = req.query;
    let reviews;

    // Get the unique genres to show in the filter dropdown
    const genres = await Model.getGenres();

    // Fetch reviews with filters
  if (rating || genre || sort) {
    reviews = await Model.getFilteredReviews(rating, genre, sort);
  } else {
    // Use the sorting functions based on the selected sort option
    if (sort === 'rating') {
      reviews = await Model.getAllReviewsByRating();
    } else if (sort === 'date') {
      reviews = await Model.getAllReviewsByDate();
    } else {
      reviews = await Model.getAllReviews();  // Default to no sorting
    }
  }

    // Modify the reviews data to include stars array and ensure `favourite` is a boolean
    const reviewsWithStars = reviews.map(review => {
        return {
            ...review,
            favourite: review.favourite === 1,
            isRating1: review.rating === 1,
            isRating2: review.rating === 2,
            isRating3: review.rating === 3,
            isRating4: review.rating === 4,
            isRating5: review.rating === 5,
        };
    });



    // Map genres correctly if they are objects like { genre: 'Action' }
    const genreSelected = genres.map(g => ({
        genre: g.genre || g,  // Adjust based on the structure of each genre
        selected: genre === g.genre || genre === g ? 'selected' : ''
    }));

    // Pass the data to the Mustache template
    res.render('main_page', { reviews: reviewsWithStars, genres: genreSelected, sort });
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

    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance']; // Define genres

    // If there are errors, re-render the form with error messages and populated genres
    if (errors.length > 0) {
        return res.render('add_form', {
            errors,
            moviename,
            review,
            date_watched,
            rating,
            genres: genres, // Pass genres to the template
            favourite,
            genre // Keep selected genre
        });
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
    console.log('Fetched Review:', review); // Debugging statement
    res.render('update_form', { review });
});

// Update review by id
app.post('/updatereview/:id', async (req, res) => {
    let { review, rating, favourite } = req.body;

    // Ensure review is a string (in case it's an object)
    review = String(review);

    // Prepare the selected attributes for the rating dropdown options
    const ratingSelected = {
        '1': rating === '1' ? 'selected' : '',
        '2': rating === '2' ? 'selected' : '',
        '3': rating === '3' ? 'selected' : '',
        '4': rating === '4' ? 'selected' : '',
        '5': rating === '5' ? 'selected' : '',
    };

    // Update the review object
    const updatedReview = { 
        review, 
        rating, 
        favourite: favourite === '1' ? 1 : 0
    };

    // Update the review in the database
    await Model.updateReview(updatedReview, req.params.id);

    // Redirect to the home page after successful update
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