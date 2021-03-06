const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const app = express();
var db = require("./models");
var passport = require("./config/passport");

const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX(axios) requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// |======================|
// |Serve up static assets|
// |======================|
if (process.env.NODE_ENV === "production") {
	app.use(express.static('client/build'));
}
else {
	app.use(express.static("client/public"));
}

//  |======|
//  |routes|
//  |======|
app.use(routes);

//  |========|
//  |passport|
//  |========|
// app.use(session({ secret: "", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//  |================|
//  |sequelize, MySQL|
//  |================|
db.sequelize.sync({ force: false }).then(function() {
	app.listen(PORT, function() {
	  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
	});
});