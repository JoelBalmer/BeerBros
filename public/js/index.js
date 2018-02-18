document.addEventListener("DOMContentLoaded", function(event) { 
  console.log('Doc ready!');
});

function getBeers() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    //PUT INTO TABLE
    putIntoTable(response);
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

    document.getElementById("feedback").innerHTML = JSON.stringify(response);
  });
}

const putIntoTable = (response) => {
  let table = document.getElementById('beer-table');
    
    for (let index in response) {
      let beer = response[index];

      // Put into row
      let nameData = document.createElement('td');
      let tasteData = document.createElement('td');
      let lookData = document.createElement('td');

      nameData.innerText = beer.name;
      tasteData.innerText = beer.taste;
      lookData.innerText = beer.look;

      let row = document.createElement('tr');
      row.append(nameData);
      row.append(tasteData);
      row.append(lookData);

      table.append(row);
    }
}