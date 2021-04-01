const LocalStrategy = require("passport-local").Strategy;
const Users = require("../Models/users");
const User = Users.User;

module.exports = (passport) => {
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username); // passport bug'i username email aslinda
      User.findOne({ email: username, password: password }, (err, user) => {
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
