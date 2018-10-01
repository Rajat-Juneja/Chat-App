const router = require('express').Router();
const uuid = require('uuid/v1');
const News = require('../../models/news');
const getNews = require('../../util/fetch-news');

router.get('/:category', async (req, res) => {
  const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
  if(categories.indexOf(req.params.category) === -1) {
    res.status(404).send('Page Not Found');
    return;
  } 
  
  try {
    let articles = await getNews(req.params.category);
    articles = articles.map(article => {
      return {
          ...article,
          category: req.params.category,
          id: uuid()
      };
    });

    let news = await News.findOne({ category: req.params.category });
    if(news === null) {
      news = new News;
      news.category = req.params.category;
      articles.forEach(article => {
        if(article.title)
          news.articles.push(article);
      });
    } else {
      let newNews = new Map();
      articles.forEach(article => newNews.set(article.title, article));
      let oldNews = new Map();
      news.articles.forEach(article => oldNews.set(article.title, article));
      let merged = new Map([...newNews, ...oldNews]);
      news.articles = [];
      
      merged.forEach(value => value.title ? news.articles.push(value) : null);
    }
    
    news.save(() => console.log('saved'));
    res.json(news.articles);
  } catch (error) {
    console.log(error);
  }
});

// router.get('/:category/:id', async (req, res) => {
//   const categories = ['business', 'entertainment', 'health', 'science', 'sports', 'technology'];
//   if (categories.indexOf(req.params.category) === -1) {
//     res.status(404).send('Page Not Found');
//     return;
//   } 

//   const news = News

// });

module.exports = router;