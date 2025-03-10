const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const Model = require('./app.model.js')

Model.makeConnection();

app.engine("mustache", mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');