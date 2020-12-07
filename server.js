const express = require("express");
// const db = require("./models");
// const session = require("express-session");
// const passport = require("passport");
const exphbs = require("express-handlebars");
const app = express();
var request = require('superagent');

// import routes
const routes = require("./routes");

// set up PORT
const PORT = process.env.PORT || 8080;

// use Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//use handlebars to render
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// set up express-session
// app.use(session({
//   secret: "keyboard cat",
//   resave: false,
//   saveUninitialized: true
// }));

// // use passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// use routes
app.use(routes);

// connect to database and start server
  app.listen(PORT, () => {
    console.log(`app listening on: http://localhost:${PORT}`);
  });
