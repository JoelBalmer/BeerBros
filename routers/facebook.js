const express = require("express");

let facebookRouter = express.Router();
facebookRouter.get("/", (req, res, next) => {
	res.send("logged in!");
});

module.exports = facebookRouter;
