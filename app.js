console.log('My socket server is running...');
var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static("public"));

var myArray = ["Something"];

app.get("/hello/", (req, res, next) => {
	res.send(myArray);
	myArray.push("Something else");

	next();
});