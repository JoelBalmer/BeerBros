console.log('My server is running...');

let express = require('express');
let app = express();
let server = app.listen(3000);

// show public site
app.use(express.static("public"));

// request logging
const requestLogging = (req, res, next) => {
	console.log(`A ${req.method} request was just made`);
	next();
}
app.use(requestLogging);

// handle the CRUD for beers
const beersRouter = require('./routers/beers-router.js');
app.use('/beers/', beersRouter);

// error handling
const errorHandler = (err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  
  res.status(err.status).send(err.message);
  next(err);
};
app.use(errorHandler);