document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('Doc ready!');
  getBeers();
});

// button handlers

function getBeers() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");

    response.forEach((beer, index) => {
      /*
      var currentRow = document.getElementById('beer-table').rows[2];
      var newRow = rowFromBeer(beer);
      if (!currentRow && currentRow.childNodes[1].innerText != newRow.childNodes[1].innerText) {
        
      }
      */

      //document.getElementById('beer-table-body').append(rowFromBeer(beer));
      document.getElementById('beer-table-body').insertBefore(rowFromBeer(beer), document.getElementById('new-beer'));
    });

    makeCellsClickable();
  });
}

function getBeer() {
  console.log("Making get request");

  $.get('/beers/', function(response){
    console.log("Receiving the response");

    document.getElementById("get-beers").innerHTML = response;
  });
}

function createBeer(button) {
  console.log('Opening input area');

  document.getElementById('new-beer').hidden = false;
  button.disabled = true;
}

function updateBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");

    document.getElementById("get-beers").innerHTML = response;
  });
}

function deleteBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");

    document.getElementById("get-beers").innerHTML = response;
  }); 
}

const inputSend = () => {
  console.log("Making post request");

  let url = "/beers/";
  let name = document.getElementById('input-name').value;
  let taste = document.getElementById('input-taste').value;
  let look = document.getElementById('input-look').value;
  url += "?name=" + name + "&taste=" + taste + "&look=" + look;

  $.post(url, function(response){
    console.log("Receiving the response");
    document.getElementById('beer-table-body').insertBefore(rowFromBeer(response), document.getElementById('new-beer'));

    document.getElementById('create-beer').disabled = false;
    document.getElementById('new-beer').hidden = true;
    makeCellsClickable();
  });
}

// private methods

const rowFromBeer = (beer) => {    
  let row = document.createElement('tr');

  console.log(beer);

  // create row data
  let numberData = document.createElement('td');
  let nameData = document.createElement('td');
  let tasteData = document.createElement('td');
  let lookData = document.createElement('td');

  nameData.innerText = beer.name;
  tasteData.innerText = beer.taste;
  lookData.innerText = beer.look;

  row.append(numberData);
  row.append(nameData);
  row.append(tasteData);
  row.append(lookData);

  return row;
}

const createTableBody = () => {
  let tableBody = document.createElement('tbody');
  tableBody.id = 'beer-table-body';
  return tableBody;
}

const makeCellsClickable = () => {
  $('td').click(function() {
    console.log(this.cellIndex + ', ' + this.parentNode.rowIndex);
  })
}