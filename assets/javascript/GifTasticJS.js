//REQUIREMENTS
//---------------------------------------------------------------------------------
// In this assignment, you'll use the GIPHY API to make a dynamic web page that 
// populates with gifs of your choice. To finish this task, you must call the GIPHY 
// API and use JavaScript and jQuery to change the HTML of your site.


// ### Instructions

// 1. Before you can make any part of our site work, you need to create 
// an array of strings, each one related to a topic that interests you. 
// Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated 
// gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. 
// If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move 
// on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it 
// into your `topics` array. Then make a function call that takes each topic in 
// the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.


//PSEUDOCODE
//---------------------------------------------------------------------------------

//build global array to contain topics
//DocumentReadyJS function calls function to pull the array topics and create html
//buttons for each one

//onclick for input in new button form adds animal to array and button to buttons

//onclick for button calls API and retrieves response
//clears display DIV
//build img tags and insert into display DIV for ten images along with rating text

//onclick for image calls API and retrieves
//still image if state was animate, sets state to still and displays img
//animated image if state was still, sets state to animate and displays img




//GLOBAL VARIABLES
//-------------------------------------------------------------------------------

// global array to contain topics(animals)
var topic = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
var apiKey = "2p8R9VP9l1bsccaVTBtjOpQ98GTBLgGw";
var state = "still";

//FUNCTIONS
//-------------------------------------------------------------------------------

//go through array and display values as buttons 
function renderButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>");
        a.addClass("animal");
        a.attr("data-name", topic[i]);
        a.text(topic[i]);
        $("#buttons").append(a);
        //Testing
        console.log("renderButtons() ran");

    }
}

//MAIN PROCESS
//-------------------------------------------------------------------------------

//DocumentReadyJS function calls function to pull the array topics and create html
//buttons for each one


$(function () 
{
    renderButtons()

    //onclick for input in new button form adds animal to array and button to buttons
    $("#addAnimal").on("click", function (event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // event.stopImmediatePropagation();
        // This line grabs the input from the textbox
        var addAnimal = $("#animal-input").val().trim();

        // Adding the input from the textbox to the topic array
        topic.push(addAnimal);

        // Calling renderButtons rebuilds the buttons from the array
        renderButtons();

    });

    //onclick for button calls API and retrieves response
    //build img tags from response and insert into display DIV for ten images along with rating text


    $(document).on("click", ".animal", function () 
    {
        $("#imagesDisplay").empty();
        console.log("button click recorded");
        searchString = $(this).attr("data-name");
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchString + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"

        })

            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                console.log(results);
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r") {
                        // Creating a div with the class "item"
                        var gifDiv = $("#imagesDisplay");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var t = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var animalImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);
                        // animalImage.attr("data-state", "still");
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        
                        
                            //  neeed to add attributes for animatedurl, static url and state


                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        (gifDiv).append(t);
                        (gifDiv).append(animalImage);

                        // Prepending the gifDiv to the "#imagesDisplay" div in the HTML
                        $("#imagesDisplay").prepend(gifDiv);
                    }
                };
            });
    });

});


$(document).on("click", "img", function () 
// // when image is clicked, toggle between still and animate
// $("img").on("click", function () 
{
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    // var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    console.log("state button image click event occurred");
    
    console.log("initial state was" + state);
    if (state === "still") 
    {
        $(this).attr("src", $(this).attr("data-animate"));
        // $(this).attr("data-state", "animate");
        state = "animate";
        console.log(state);
    } else 
    {   (state === "animate")
        $(this).attr("src", $(this).attr("data-still"));
        // $(this).attr("data-state", "still");
        state = "still";
        console.log(state);
    }

});


// });
