const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
var db = require("./models");
var passport = require("./config/passport");

const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve up static assets
// app.use(express.static("client/build"));
app.use(express.static("client/public"));

// Add routes, both API and view
app.use(routes);

//  |========|
//  |passport|
//  |========|
// app.use(session({ secret: "", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync({}).then(function() {
	app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});