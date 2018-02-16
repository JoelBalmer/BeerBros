function getBeers() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    document.getElementById("get-beers").innerHTML = response;
  });
}

function getBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    document.getElementById("get-beers").innerHTML = response;
  });
}

function createBeer() {
  console.log("Making get request");

  $.get("/beers/", function(response){
    console.log("Receiving the response");
    console.log(response);

    document.getElementById("get-beers").innerHTML = response;
  });
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