function getFunction() {
  console.log("Making get request");

  $.get("/hello/", function(response){
    console.log("Receiving the response");
    console.log(response);
  });
}