//We're using ExpressJS
const express = require('express');
const app = express();

//We're using MongoDB, so we're using Mongoose for mapping JSON to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = mongoose.model('Review', {
  title: String
});


//We're also using Handlebars for ExpressJS
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//***Main code***

//Testing/example code
//app.get('/', (req, res) => {
//    res.render('home', {msg: 'Hello World!'});
//});
//

//Our mock array of projects
// let reviews = [
//     { title: "Great Review" },
//     { title: "Next Review" }
// ];

app.get('/reviews', (req, res) => {
    res.render('reviews-index', { reviews });
});

//Index
app.get('/', (req, res) => {
  Review.find().then((reviews) => {
    res.render('reviews-index', {reviews: reviews});
    }).catch((err) => {
      console.log(err);
    });
});

//Listens for port 3000: E.g. localhost:3000s
app.listen(3000, () => {
   console.log('App listening on port 3000!');
});
