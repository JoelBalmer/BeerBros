console.log('My server is running...');

let express = require('express');
let app = express();
let server = app.listen(3000);

app.use(express.static("public"));

const beersRouter = require('./beers-router.js');
app.use('/beers/', beersRouter);