//We're using ExpressJS
const express = require('express');
const app = express();

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
//app.listen(3000, () => {
//    console.log('App listening on port 3000!');
//});

//Our mock array of projects
let reviews = [
    { title: "Great Review" },
    { title: "Next Review" }
];

//Index
app.get('/reviews', (req, res) => {
    res.render('reviews-index', { reviews });
});

app.get('/', (req, res) => {
    res.render('reviews-index', {reviews});
});