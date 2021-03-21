const LocalStrategy = require("passport-local").Strategy;
const Users = require("../Models/users");

module.exports = function (passport) {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });

  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log(username); // passport bug'i username email aslinda
      Users.User.findOne({ email: username, password: password }, function (
        err,
        user
      ) {
        if (err) {
          console.log(username);
          console.log(err);
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        return done(null, user);
      });
    })
  );
};
