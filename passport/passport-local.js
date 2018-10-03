const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);

  }
  );
});

passport.use('local', new LocalStrategy({
  passReqToCallback: true
},
  function (req, username, password, done) {
    User.findOne({ 'email': username }, function (err, user) {
      // In case of any error, return using the done method
      if (err) {
        return done(err);
        console.log("hi");
      }
      // Username does not exist, log error & redirect back
      if (!user) {
        console.log('User Not Found with email ' + username);
        return done(null, false,
          { message: 'User Not found.' });
        console.log("hi1");
      }
      // User exists but wrong password, log the error
      if (!user || !user.validPassword(password)) {
        console.log('Invalid Password');
        return done(null, false,
          { message: 'Invalid Password' });
        console.log("hi2");
      }
      // User and password both match, return user from
      // done method which will be treated like success
      return done(null, user);
    }
  );
}));




