const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

let appSecret = "4c63987c593c7fd4db3fc11590bdba00";
let appId = "444071202692690";

let facebookOptions = {
	clientID: appId,
	clientSecret: appSecret,
	callbackURL: "http://localhost:3000/auth/facebook/callback"
};

const facebookCallback = function(accessToken, refreshToken, profile, cb) {
	console.log(accessToken, refreshToken, profile);
};

passport.use(new FacebookStrategy(facebookOptions, facebookCallback));

let facebookRouter = express.Router();
facebookRouter.get("/", (req, res, next) => {
	console.log("hello");
	passport.authenticate("facebook");
});

module.exports = facebookRouter;
