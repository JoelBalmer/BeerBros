// facebook auth 1
var passport = require("passport"),
	FacebookStrategy = require("passport-facebook").Strategy,
	session = require("client-sessions");

// setup expres server
let express = require("express");
let app = express();
let server = app.listen(3000);
let username = "";
let userId = "";
let token = "";

console.log("My server is running...");

// show public site
app.use(express.static("public"));

app.use(
	session({
		cookieName: "session",
		secret: "thereisabsolutelynothingthatidontlikeaboutnode",
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000
	})
);

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
			accessToken = token;

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

// logout of facebook
app.get("/logout", function(req, res) {
	debugger;
	/*
	req.logout();
	res.redirect("https://www.facebook.com/logout.php?access_token=" + token + "&confirm=1&next=http://localhost:3000/");
	console.log(req);
	res.redirect(
		"http://localhost:3000/"
	);
	*/

	req.logout();
	res.redirect(
		"https://www.facebook.com/logout.php?next=" +
			"http://localhost:3000/" +
			"/logout&access_token=" +
			token
	);

	/*
	req.session.destroy(err => {
		if (err) return next(err);
		req.logout();
		res.sendStatus(200);
	});
	*/
});

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
