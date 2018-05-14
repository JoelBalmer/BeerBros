const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");

let facebookCallbackRouter = express.Router();
facebookCallbackRouter.get("/", (req, res, next) => {
	res.send("checks the status");
});

module.exports = facebookCallbackRouter;
