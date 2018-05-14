// setup expres server
const express = require("express");
const app = express();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const port = 3000;

/*
const cors = require("cors");
app.use(cors());
*/

app.listen(port);
console.log("my server is running...");

// show public site
app.use(express.static("public"));

// request logging
const requestLogging = (req, res, next) => {
	console.log(`A ${req.method} request was just made`);
	next();
};

app.use(requestLogging);

// handle the CRUD for beers
const beersRouter = require("./routers/beers-router.js");
app.use("/beers/", beersRouter);

/*
// handle facebook login
const facebookLogin = require("./routers/facebook.js");
app.use("/login/", facebookLogin);

// handle facebook callback
const facebookCallback = require("./routers/facebook-callback.js");
app.use("/auth/facebook/callback", facebookCallback);
*/

let appSecret = "4c63987c593c7fd4db3fc11590bdba00";
let appId = "444071202692690";

let facebookOptions = {
	clientID: appId,
	clientSecret: appSecret,
	callbackURL: "http://localhost:3000/auth/facebook/callback"
};

const facebookCallback = function(accessToken, refreshToken, profile, done) {
	console.log(profile);
	done(null, u);
};

passport.use(new FacebookStrategy(facebookOptions, facebookCallback));

let callbackOptions = {
	successRedirect: "/",
	failureRedirect: "/"
};
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", callbackOptions)
);

// error handling
const errorHandler = (err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
	}

	res.status(err.status).send(err.message);
	next(err);
};

app.use(errorHandler);
