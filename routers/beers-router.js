const express = require('express');
const sqlite3 = require('sqlite3');

let beers = [];

// get beers
let db = new sqlite3.Database('./beers.sqlite');
db.all('SELECT * FROM beerTable', (error, rows) => {
  // assign to local beers array
  beers = rows;
});

// use separate beer rooter file
let beersRouter = express.Router();

// Get all beers
beersRouter.get('/', (req, res, next) => {
	res.send(beers);
});

// create a beer
beersRouter.post('/', (req, res, next) => {
  // candidate to add to middle ware for all 'post requests' to beer
  
  /*
  let newId = beers.length;
  while(database.contains(newId)) {
    newId++;
  }
  req.query.id = newId
  */
  
  req.query.id = beers.length + 1;

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
    }    
  );

  beers.push(req.query); 
  res.send(req.query);
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

// Delete an expression
beersRouter.delete('/:id', (req, res, next) => {

  // need to reassign ids, or maybe go back
  // to displaying with css (if we're to keep ids consistent?)

  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = beersRouter;