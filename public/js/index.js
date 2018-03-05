document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('Doc ready!');

  getBeers();
});

// button handlers

function getBeers() {
  $.get('/beers/', function(response){

    response.forEach((beer, index) => {
      document.getElementById('beer-table-body').insertBefore(rowFromBeer(beer), document.getElementById('new-beer'));
    });

    makeCellsClickable();
  });
}

function getBeer() {
  $.get('/beers/', function(response){
    document.getElementById("get-beers").innerHTML = response;
  });
}

function createBeer(button) {
  document.getElementById('new-beer').hidden = false;
  button.disabled = true;
}

function updateBeer() {
  $.get("/beers/", function(response){
    document.getElementById("get-beers").innerHTML = response;
  });
}

function deleteBeer() {
  $.get("/beers/", function(response){
    document.getElementById("get-beers").innerHTML = response;
  }); 
}

const inputSend = () => {
  let url = "/beers/";
  let name = document.getElementById('input-name').value;
  let taste = document.getElementById('input-taste').value;
  let look = document.getElementById('input-look').value;
  url += "?name=" + name + "&taste=" + taste + "&look=" + look;

  $.post(url, function(response) {
    document.getElementById('beer-table-body').insertBefore(rowFromBeer(response), document.getElementById('new-beer'));
    hideNewBeer();
    makeCellsClickable();
    console.log(response);
  });
}

const hideNewBeer = () => {
  document.getElementById('create-beer').disabled = false;
  var newBeer = document.getElementById('new-beer');
  newBeer.hidden = true;
  var list = newBeer.getElementsByTagName('input');
  for (let i = 0; i < list.length; i++) {
    list[i].value = '';
  }
}

// private methods

const rowFromBeer = (beer) => {    
  let row = document.createElement('tr');

  // create row data
  let numberData = document.createElement('td');
  let nameData = document.createElement('td');
  let tasteData = document.createElement('td');
  let lookData = document.createElement('td');
  let idData = document.createElement('td');

  // leave number data empty
  nameData.innerText = beer.name;
  tasteData.innerText = beer.taste;
  lookData.innerText = beer.look;
  let span = document.createElement('span');
  span.id = 'id-span';
  span.innerText = beer.id;
  idData.append(span);

  // setup buttons to cancel or confirm editing
  let editSuccessButton = document.createElement('Button');
  editSuccessButton.id = 'edit-success';
  editSuccessButton.classList.add('success-button');
  editSuccessButton.hidden = true;

  let editCancelButton = document.createElement('Button');
  editCancelButton.id = 'edit-cancel';
  editCancelButton.classList.add('cancel-button');
  editCancelButton.hidden = true;
  
  // add to row and return
  numberData.append(editCancelButton);
  row.append(numberData);
  row.append(nameData);
  row.append(tasteData);
  row.append(lookData);
  row.append(idData);
  idData.append(editSuccessButton);

  return row;
}

const createTableBody = () => {
  let tableBody = document.createElement('tbody');
  tableBody.id = 'beer-table-body';
  return tableBody;
}

const makeCellsClickable = () => {
  $('td').click(function() {
    let selected = $('.selected');
    if (selected.length !== 0) {
      let cancel = selected.find('.cancel-button')[0];
      cancel.hidden = true;
      let success = selected.find('.success-button')[0];
      success.hidden = true;
    }

    $('.selected').removeClass('selected');
    
    this.parentNode.firstElementChild.lastElementChild.hidden = false;
    this.parentNode.lastElementChild.lastElementChild.hidden = false;
    this.parentNode.lastElementChild.firstElementChild.hidden = true;
    this.parentNode.classList.add('selected');
    console.log(this.parentNode);
  })
}