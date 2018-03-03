console.log('My server is running...');

let express = require('express');
let app = express();
let server = app.listen(3000);

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