const router = require('express').Router();
const passport = require('passport');
const User = require('../../models/user');
const sources = require('../../util/get-sources');

router.get("/getUsers", async (req, res) => {
  const users = await User.find();
  res.json(users.length);
})

router.post("/signin", function (req, res) {
  const categories = ['business', 'entertainment', 'health', 'sports', 'science', 'technology'];
  const newUser = new User();
  newUser.email = req.body.email;
  newUser.name = req.body.name;
  newUser.password = newUser.encryptPassword(req.body.password);
  let i = 0;
  for(let category of categories) {
    let counter = 0;
    let sourceArr = sources[category];
    sourceArr = sourceArr.map(item => {
      let ctr = Math.floor(Math.random() * 150);
      counter += ctr;
      return {
        source: item,
        count: ctr
      };
    });
    newUser.news.push({
      category: category,
      count: counter
    });
    newUser.news[i].sources = [];
    sourceArr.forEach(item => newUser.news[i].sources.push(item));
    i++;
  }
  newUser.save(function (err, newUser) {
    if (err) {
      res.status(500).send(err);
      console.log(err);
    }
    else
      req.login(newUser, function (err, user) {
        if (err) {
          res.status(500).send(err);

        }
        res.status(200).send(newUser);
      });
  });

});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  next();

},
  passport.authenticate('local'), (req, res) => {
    console.log("logged in", req.user);

    res.send(req.user);

  });


router.post('/loginnow', function (req, res) {
  var user = req.body.userId;
  console.log(req.body.userId);

  User.findById(user, function (err, found) {
    req.login(found, function (err, user) {
      if (err) {
        res.status(500).send(err);

      }
      res.status(200).send(user);
    });
    if (req.isAuthenticated()) {
      console.log("yes the old one is logged in");
    }
  })
});


module.exports = router;