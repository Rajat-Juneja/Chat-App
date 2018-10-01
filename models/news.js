const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  category: String,
  articles: [{
    source: {
      id: String,
      name: String
    },
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
    category: String,
    id: String
  }] 
});

module.exports = mongoose.model('News', newsSchema);