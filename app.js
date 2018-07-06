// facebook auth 1
var passport = require("passport"),
	FacebookStrategy = require("passport-facebook").Strategy;

// setup expres server
let express = require("express");
let app = express();
let port = process.env.PORT || 3000;
let server = app.listen(port);
let username = "";
let userId = "";

console.log("My server is running...");

// show public site
app.use(express.static("public"));

// request logging
const requestLogging = (req, res, next) => {
	console.log(`A ${req.method} request was just made`);
	next();
};
app.use(requestLogging);

// handle the CRUD for beers
var beersRouter = require("./routers/beers-router.js");
app.use("/beers/", beersRouter);

// get user details
app.get("/user/name", (req, res, next) => {
	res.send(username);
});
app.get("/user/id", (req, res, next) => {
	res.send(userId);
});

// facebook auth 2
var FACEBOOK_APP_ID = "444071202692690";
var FACEBOOK_APP_SECRET = "4c63987c593c7fd4db3fc11590bdba00";
passport.use(
	new FacebookStrategy(
		{
			clientID: FACEBOOK_APP_ID,
			clientSecret: FACEBOOK_APP_SECRET,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		},
		function(accessToken, refreshToken, profile, done) {
			username = profile.displayName;
			userId = profile.id;

			// for user details to be public
			module.exports.userId = userId;
			done(null);
		}
	)
);
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/",
		failureRedirect: "/login"
	})
);

// facbeook login error
const loginError = (req, res, next) => {
	console.log(`There was a facebook login error`);
	res.redirect("http://localhost:3000/");
};
app.use("/login", loginError);

// error handling
const errorHandler = (err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
	}

	res.status(err.status).send(err.message);
	next(err);
};

app.use(errorHandler);
