require("dotenv").config({
  path: "variables.env",
});

var express = require("express");
var cors = require("cors");
var fs = require("fs");
var passport = require("passport");
var bodyParser = require("body-parser");
var moment = require("moment");
var https = require("https");
moment.locale("en");
const path = require("path");

const PORT = process.env.PORT || 5000;

// lets require/import the mongodb native drivers.
var mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

const common = require("./helpers/common-functions");

const UserRoutes = require("./routes/user_routes");
const CategoryRoutes = require("./routes/category_routes");
const AuthorizationRoutes = require("./routes/authorization_routes");
const PostRoutes = require("./routes/post_routes");
const ActivityRoutes = require("./routes/activity_routes");

var app = express();

var fileupload = require("express-fileupload");
app.use(fileupload());

app.use(
  cors({
    credentials: true,
    //origin: "http://localhost:8080", // dev to prod
    origin: "https://defensehere.herokuapp.com", // dev to prod
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

require("./routes/passport")(passport);

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use("/", UserRoutes);
app.use("/", CategoryRoutes);
app.use("/", AuthorizationRoutes);
app.use("/", PostRoutes);
app.use("/", ActivityRoutes);

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

app.post(
  "/login/local",
  passport.authenticate("local", {
    successRedirect: "/success",
    failureRedirect: "/fail",
  })
);

app.get("/images/:id", jsonParser, function (req, res) {
  var id = req.params.id;

  path.resolve("temp/index.html");
  res.sendFile(id, { root: "./images" });
});

app.listen(PORT, () =>
  console.log(`Defensehere web listening on port ${PORT}!`)
);

// httpServer = http.createServer(app);
// httpsServer = https.createServer(https_options, app)

// httpServer.listen(PORT, hostname);
// httpsServer.listen(https_port, hostname)
