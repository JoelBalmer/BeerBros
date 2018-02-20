document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('Doc ready!');
});

function getBeers() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    response.forEach((beer) => {
      console.log('heres a beer');
      console.log(beer);
      document.getElementById('beer-table-body').append(rowFromBeer(beer));
    });
  });
}

function getBeer() {
  console.log("Making get request");

  $.get('/beers/', function(response){
    console.log("Receiving the response");
    console.log(response);

    document.getElementById("get-beers").innerHTML = response;
  });
}

function createBeer() {
  console.log('Opening input area');
  document.getElementById('input-area').classList = "input-show";
}

function updateBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    document.getElementById("get-beers").innerHTML = response;
  });
}

function deleteBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

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
    console.log(response);

    document.getElementById('beer-table-body').append(rowFromBeer(response));
  });
}

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