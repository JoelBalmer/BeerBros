const express = require('express');

let beers = [
  {
    name: 'Budvar',
    taste: 'Not bad',
    look: 'Normal'
  },
  {
    name: 'Doubloon',
    taste: 'Great',
    look: 'Nice!'
  }
];

let beersRouter = express.Router();

// Get all beers
beersRouter.get('/', (req, res, next) => {
	res.send(beers);
});

// Get a single expression
beersRouter.get('/:id', (req, res, next) => {
  const foundExpression = getElementById(req.params.id, expressions);
  if (foundExpression) {
    res.send(foundExpression);
  } else {
    res.status(404).send();
  }
});

// Create an expression
beersRouter.post('/', (req, res, next) => {
  console.log('hello');
  console.log(req.query);
  
  beers.push(req.query);
  res.send(req.query);

  /*
  if (receivedExpression) {
    expressions.push(receivedExpression);
    res.status(201).send(receivedExpression);
  } else {
    res.status(400).send();
  }
  */
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
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = beersRouter;