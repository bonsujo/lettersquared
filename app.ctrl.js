const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

Model.makeConnection();

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


// Start the server
app.listen(3000, function() { 
    console.log("Server listening on port 3000..."); 
});