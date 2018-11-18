const fetch = require('node-fetch');
const sources = require('./get-sources');

module.exports = async function (category) {
  let articles = [];
  try {
    const query = `pageSize=15&sources=${sources[category].join(',')}`;
    console.log(query)
    const res = await fetch(`https://newsapi.org/v2/top-headlines?${query}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': process.env.API_KEY
      }
    });
    const data = await res.json();
    articles = [...data.articles];
    return articles;
  } catch(err) {
    console.log(err);
  }
}