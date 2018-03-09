document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('Doc ready!');

  getBeers();
});

// button handlers
function getBeers() {
  $.get('/beers/', function(response){

    console.log('beers have been got!');
    console.log(response);

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
  deselectRow();
  button.disabled = true;
}

function updateBeer() {
  $.get("/beers/", function(response) {
    document.getElementById("get-beers").innerHTML = response;
  });
}

function deleteBeer(id) {
  let url = '/beers/' + id;

  $.ajax({
    url: url,
    type: 'DELETE',
    success: function(response) {
      console.log("Receiving delete response");
      let table = document.getElementById('beer-table-body');
      var row = document.getElementsByClassName('selected')[0];
      table.deleteRow(row.sectionRowIndex);
    }
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
  let newBeer = document.getElementById('new-beer');
  newBeer.hidden = true;
  let list = newBeer.getElementsByTagName('input');
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
  editSuccessButton.classList.add('success-button');
  editSuccessButton.hidden = true;
  editSuccessButton.innerHTML = '&check;';

  let deleteButton = document.createElement('Button');
  deleteButton.classList.add('cancel-button');
  deleteButton.hidden = true;
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', deleteHandler);
  
  // add to row and return
  numberData.append(deleteButton);
  row.append(numberData);
  row.append(nameData);
  row.append(tasteData);
  row.append(lookData);
  row.append(idData);
  idData.append(editSuccessButton);

  return row;
}

const deleteHandler = (event) => {
  let deleteConfirm = confirm('Are you sure you want to delete this beer?');
  if (!deleteConfirm) {
    return;
  }

  let id = event.target.parentNode.parentNode.lastElementChild.firstElementChild.innerText;
  deleteBeer(id);
}

const createTableBody = () => {
  let tableBody = document.createElement('tbody');
  tableBody.id = 'beer-table-body';
  return tableBody;
}

const deselectRow = () => {
  let selected = $('.selected');
    
  if (selected.length !== 0) {
    let cancel = selected.find('.cancel-button')[0];
    cancel.hidden = true;
    let success = selected.find('.success-button')[0];
    success.hidden = true;
    selected[0].lastElementChild.firstElementChild.hidden = false;
  }

    $('.selected').removeClass('selected');
}

const makeCellsClickable = () => {
  $('td').click(function() {
    if (this.parentNode === document.getElementById('new-beer')) {
      return;
    }

    hideNewBeer();
    deselectRow();
    
    this.parentNode.firstElementChild.lastElementChild.hidden = false;
    this.parentNode.lastElementChild.lastElementChild.hidden = false;
    this.parentNode.lastElementChild.firstElementChild.hidden = true;
    this.parentNode.classList.add('selected');
  })
}