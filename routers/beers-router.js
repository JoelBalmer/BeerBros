const express = require('express');
const sqlite3 = require('sqlite3');

let beers = [];
let beersLookup = {};

// get database
let db = new sqlite3.Database('./beers.sqlite');

const getBeersFromDB = () => {
  console.log('the response in beers-router.js 1');
  console.log(beers);

  db.all('SELECT * FROM beerTable', (error, rows) => {
    beers = rows;
    console.log('the response in beers-router.js 2');
    console.log(beers);
  });
}

// initialise
getBeersFromDB();

// use separate beer rooter file
let beersRouter = express.Router();

// Get all beers
beersRouter.get('/', (req, res, next) => {
  getBeersFromDB();

  // update lookup
  for (let i = 0, len = beers.length; i < len; i++) {
    beersLookup[beers[i].id] = beers[i];
  }
	res.send(beers);
});

// create a beer
beersRouter.post('/', (req, res, next) => {
  // should use middleware for this idea, ideally
  var timeInSecs = new Date();
  req.query.id = Math.floor(timeInSecs.getTime() / 1000);

  // push beer to database
  db.run(
    'INSERT INTO beerTable (name, taste, look, id) VALUES ($name, $taste, $look, $id)',
    {
      $name: req.query.name,
      $taste: req.query.taste,
      $look: req.query.look,
      $id: req.query.id
    },
    error => {
      if (error) {
        console.log(error);
        res.status(400).send('Could not create');
        return;
      }
      else {
        // return beer in request
        beers.push(req.query); 
        res.send(req.query);
      }
    }    
  );
});

// Update an expression
beersRouter.put('/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[expressionIndex]);
  } else {
    res.status(404).send();
  }
});

// Delete a beer
beersRouter.delete('/:id', (req, res, next) => {
  let beer = beersLookup[req.params.id];
  if (!beer) {
    res.status(404).send("This beer isn't in your collection!");
    return;
  }

  db.run(
    'DELETE FROM beerTable WHERE id = $id',
    {
      $id: req.params.id
    },
    error => {
      if (error) {
        console.log(error);
        res.status(400).send('Could not delete beer from database');
        return;
      }
      else {
        getBeersFromDB();
        res.status(204).send(beers);
      }
    }
  );
});

module.exports = beersRouter;