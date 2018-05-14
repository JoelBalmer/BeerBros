// setup expres server
let express = require("express");
let app = express();
let server = app.listen(3000);

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
const beersRouter = require("./routers/beers-router.js");
app.use("/beers/", beersRouter);

// handle facebook login
const facebookLogin = require("./routers/facebook.js");
app.use("/login/", facebookLogin);

// error handling
const errorHandler = (err, req, res, next) => {
	if (!err.status) {
		err.status = 500;
	}

	res.status(err.status).send(err.message);
	next(err);
};

app.use(errorHandler);
