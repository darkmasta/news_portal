require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var request = require("request");
var CryptoJS = require("crypto-js");
var cors = require("cors");
var http = require("http");
var fs = require("fs");
var passport = require("passport");
var ensureLoggedIn = require("connect-ensure-login");
var bodyParser = require("body-parser");

var moment = require("moment");
var https = require("https");
moment.locale("en");
const path = require("path");

const lineReader = require("line-reader");

const PORT = process.env.PORT || 5000;

// lets require/import the mongodb native drivers.
var mongodb = require("mongodb");
var mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

var Users = require("./Models/users");
var Leads = require("./Models/leads");
var Customers = require("./Models/customers");
var _ = require("underscore");
var s = require("underscore.string.spxis");
const common = require("./helpers/common-functions");

const UserRoutes = require("./routes/user_routes");
const CategoryRoutes = require("./routes/category_routes");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username);
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

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

var app = express();

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080", // dev to prod
    //origin: 'http://dealers.nexusautotransport.com:5000' // dev to prod
  })
);
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: false }));
var jsonParser = bodyParser.json();
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use("/", UserRoutes);
app.use("/", CategoryRoutes);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var cons = require("consolidate");
app.engine("html", cons.swig);
app.use(express.static(__dirname + "/views/dist"));
app.set("views", __dirname + "/views/dist");
app.set("view engine", "html");

/*
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
*/

app.get("/dist", function (req, res) {});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/fail", function (req, res) {
  res.json("Error signing in");
});

app.get("/success", function (req, res) {
  var query = Users.User.findOne({ email: req.user.email });

  query.exec(function (err, user) {
    if (err) {
      return handleError(err);
    }
    if (user == null) {
      var User = new Users.User({
        email: req.user.email,
        balance: 0.0,
      });

      var promise = User.save();

      promise.then(function (doc) {
        // console.log("User", User.display_name, "saved successfully");
        // console.log(doc);
      });
    } else {
      req.user.data = user;
      // console.log(req.user.data.balance);
    }
  });

  var token = CryptoJS.AES.encrypt(
    String(req.user.email),
    String(process.env.JWT_SECRET)
  ).toString();

  res.cookie("defensehere", token, { maxAge: 90000000 });
  res.json("Success");
});

app.post(
  "/login/local",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

app.post("/register", jsonParser, function (req, res) {
  var userData = req.body.data;
  console.log(userData);
  var query = Users.User.findOne({ email: userData.email });

  query.exec(function (err, user) {
    if (err) {
      return handleError(err);
    }
    if (user == null) {
      var User = new Users.User({
        email: userData.email,
        password: userData.password,
        balance: 0.0,
      });

      var promise = User.save();

      promise.then(function (doc) {
        // console.log("User", User.display_name, "saved successfully");
        // console.log(doc);
      });
    } else {
      req.user.data = user;
      // console.log(req.user.data.balance);
    }
  });

  var token = CryptoJS.AES.encrypt(
    String(userData.email),
    String(process.env.JWT_SECRET)
  ).toString();

  res.cookie("defensehere", token, { maxAge: 90000000 });
  res.redirect("/");
});

app.get(
  "/login/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

/*
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    var userData = req.user._json
    var query = Users.User.findOne({ email: userData.email })

    query.exec(function (err, user) {
      if (err) {
        return handleError(err)
      }
      if (user == null) {
        var User = new Users.User({
          facebook_id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          balance: 0.0
        })

        var promise = User.save()

        promise.then(function (doc) {
        // console.log("User", User.display_name, "saved successfully");
        // console.log(doc);
        })
      } else {
        req.user.data = user
        // console.log(req.user.data.balance);
      }
    })

    var token = CryptoJS.AES.encrypt(String(userData.email), String(process.env.JWT_SECRET)).toString()

    res.cookie('nexusweb', token, { maxAge: 90000000 })
    res.redirect('/')
  })

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function (req, res) {
    res.render('profile', { user: req.user })
  })
  */

app.get("/user-info", function (req, res) {
  var userId = CryptoJS.AES.decrypt(
    req.cookies.nexusweb,
    String(process.env.JWT_SECRET)
  ).toString(CryptoJS.enc.Utf8);

  var promise = Users.User.find({ facebook_id: userId });

  promise.then(function (doc) {
    res.json(doc[0]);
  });
});

app.get("/images/:id", jsonParser, function (req, res) {
  var id = req.params.id;

  path.resolve("temp/index.html");
  res.sendFile(id, { root: "./images" });
});

app.listen(PORT, () => console.log(`Nexus web listening on port ${PORT}!`));

// httpServer = http.createServer(app);
// httpsServer = https.createServer(https_options, app)

// httpServer.listen(PORT, hostname);
// httpsServer.listen(https_port, hostname)
