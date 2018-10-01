const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  news: [{
    category: String,
    count: Number,
    sources: [{
      source: String,
      count: Number
    }]
  }]
});

module.exports = mongoose.model('User', userSchema);