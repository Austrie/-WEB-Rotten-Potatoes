const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  description: String
});
module.exports = Review;
