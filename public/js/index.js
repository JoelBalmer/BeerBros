function getBeers() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    let string = JSON.stringify(response);
    document.getElementById("feedback").innerText = string;
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