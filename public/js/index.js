function getFunction() {
  console.log("Making get request");

  $.ajax("/hello/", function(response){
    console.log("Here's the response");
    console.log(response);
  });
}