//We're using ExpressJS
const express = require('express');
const app = express();

//In order to use expressjs's post and delete functionality from form
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

//We're using MongoDB, so we're using Mongoose for mapping JSON to MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', { useMongoClient: true });
const Review = require('./models/review');
const Comment = require('./models/comment');


//Body parser to parse text
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



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

// //Our mock array of projects
// let reviews2 = [
//     { title: "Great Review" },
//     { title: "Next Review" }
// ];


//Delete all of them
app.get('/reviews/delete/empty', (req, res) => {
  // console.log("Deleted review: " + req.params.id);
  // Review.findByIdAndRemove(req.params.id).then((review) => {
  //   res.redirect('/');
  // }).catch((err) => {
  //   console.log(err.message);
  // });

  Review.where({ title: "" }).remove().then(() => {
    res.redirect('/');
  });
});

//Delete a posted review
app.delete('/reviews/:id', (req, res) => {
  console.log("Delete review: " + req.params.id);
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  });
});

//To submit/update editted review
app.put('/reviews/:id', (req, res) => {
  console.log("Reviews put called");
  Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
    res.redirect('/reviews/' + review._id);
  });
});

//To go to edit reviews screen
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    res.render('reviews-edit', {review});
  });
});

//New Comment
app.post('/reviews/comment', (req, res) => {
  Comment.create(req.body).then((comment) => {
    // comment.save();
    console.log(comment.title);
    res.redirect('/reviews/' + comment.reviewId);
  }).catch((err) => {
    console.log(err.message);
  });
});

//When a new review is submitted and user is sent back to /reviews
app.post('/reviews', (req, res) => {
  console.log("Review before mongodb: " + req.body.title);

  // const review = new Review(req.body)

  // review.save().then((review) => {
  //   res.redirect('/');
  // }).catch((err) => {
  //   console.log(err.message)
  // })

  // title: String,
  // movieTitle: String,
  // description: String

  if (req.body.title === "" || req.body.movieTitle === "") {
    return res.redirect('/reviews/new')
  }


  Review.create(req.body).then((review) => {
    console.log("Review after mongodb" + review);
    // return review.save();
  }).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  });
});

app.get('/reviews', (req, res) => {
    res.redirect('/');
});

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
});

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', {review});
  }).catch((err) => {
    console.log(err.message);
  });
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
app.listen(process.env.PORT || 3000, () => {
   console.log('App listening on port 3000!');
});
