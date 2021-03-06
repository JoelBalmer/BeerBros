const express = require("express");
const sqlite3 = require("sqlite3");
let app = require("../app.js");

var beers = [];
var beersLookup = {};
var sortDirection = "DESC";
var sortType = "id";

// get database
var db = new sqlite3.Database("./beers.sqlite");

const getBeersFromDB = (orderBy, callback) => {
  let orderString = "";
  let sql = "SELECT * FROM beerTable";

  if (orderBy) {
    // filter for users beers if logged in
    if (app.userId) {
      sql += " WHERE uid = $uid";
    }

    sortType = orderBy;
    orderString = " ORDER BY " + sortType + " " + sortDirection;
    sql += orderString;
  }

  db.all(sql, { $uid: app.userId }, (err, rows) => {
    beers = rows;
    if (callback) {
      callback(beers);
    }
  });
};

// initialise
getBeersFromDB("id");

// use separate beer rooter file
var beersRouter = express.Router();

// Get all beers
beersRouter.get("/", (req, res, next) => {
  getBeersFromDB(req.query.order_by, function(response) {
    // update lookup
    for (let i = 0, len = response.length; i < len; i++) {
      beersLookup[response[i].id] = response[i];
    }

    res.send(response);
  });
});

// create a beer
beersRouter.post("/", (req, res, next) => {
  // should use middleware for this idea, ideally
  var timeInSecs = new Date();
  req.query.id = Math.floor(timeInSecs.getTime() / 1000);

  let overallScore =
    Number(req.query.look_score) + Number(req.query.taste_score);

  // push beer to database
  db.run(
    "INSERT INTO beerTable (name, brewery, taste, taste_score, look, look_score, overall, overall_score, id, uid) VALUES ($name, $brewery, $taste, $taste_score, $look, $look_score, $overall, $overall_score, $id, $uid)",
    {
      $name: req.query.name,
      $brewery: req.query.brewery,
      $taste: req.query.taste,
      $taste_score: req.query.taste_score,
      $look: req.query.look,
      $look_score: req.query.look_score,
      $overall: req.query.overall,
      $overall_score: overallScore,
      $id: req.query.id,
      $uid: req.query.uid
    },
    error => {
      if (error) {
        console.log(error);
        res.status(400).send("Could not create");
        return;
      } else {
        // return beer in request
        beers.push(req.query);
        getBeersFromDB(sortType, response => {
          res.status(204).send(req.query);
        });
      }
    }
  );
});

// Update a beer
/*
beersRouter.put('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});
*/

// Delete a beer
beersRouter.delete("/:id", (req, res, next) => {
  let beer = beersLookup[req.params.id];
  if (!beer) {
    res.status(404).send("This beer isn't in your collection!");
    return;
  }

  db.run(
    "DELETE FROM beerTable WHERE id = $id",
    {
      $id: req.params.id
    },
    error => {
      if (error) {
        console.log(error);
        res.status(400).send("Could not delete beer from database");
      } else {
        getBeersFromDB(sortType, response => {
          res.status(204).send(response);
        });
      }
    }
  );
});

module.exports = beersRouter;
