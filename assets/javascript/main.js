$(document).ready(function(){

//array for the starting buttons
var foods = ["Pizza", "Hot dogs", "Mashed Potates", "Tacos" ];

function renderButtons(){

    $("#food-view").empty();

    for (var i =0; i < foods.length; i++){
        //creating a button 
        var a = $("<button>");

        a.addClass("food-buttons");

        a.attr("data-name", foods[i]);
        
        a.text(foods[i]);

        $("#food-view").append(a);

    };
    
};

renderButtons();

    $("#add-food").on("click", function(event){

        event.preventDefault();

        var newFood = $("#food-insert").val().trim();

        foods.push(newFood);

        $("#food-insert").val("");

        renderButtons();
        console.log(foods);

    });
    

 function displayFood(){
    
    var food= $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=yUPzpJadHAzkEpmsvBSpgfvT5ZQrrOHq&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
    })
        .then(function(response){

            var results= response.data;

        for (var i = 0; i < results.length; i++){

            if(results[i].rating !== "r" && results[i].rating !== "pg-13")

                var foodDiv= $("<div class = 'newgiphy'>");
                
                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var personalImage= $("<img>");

                var animated= results[i].images.fixed_height_small.url;

                var static = results[i].images.fixed_height_small_still.url;

               personalImage.addClass("foodGiphy");
               personalImage.attr("src", static);
               personalImage.attr("data-state","still");
               personalImage.attr("data-animate", animated);
               personalImage.attr("data-still", static);
               
               foodDiv.append(p);

               foodDiv.append(personalImage);

               $("#appear").prepend(foodDiv);

            }

        })

    };

    $(document).on("click", ".food-buttons", displayFood);
    $(document).on("click", ".foodGiphy", playpause); 

    function playpause() {

      var state = $(this).attr("data-state");

      if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));

        $(this).attr("data-state", "animate")

      } else {

        $(this).attr("src", $(this).attr("data-still"));

        $(this).attr("data-state", "still");
      }

    }


});