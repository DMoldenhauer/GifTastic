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
//DocumentReadyJS function calls function to pull the array topics and display
//buttons for each one
//onclick to call the API when a button is pressed
//create buttons in html from the array
//loop that appends a button for each string in the array
//build interface that calls the API each time a user clicks on a topic button and
//populates the html with 10 static images received from the API after clearing 
//the display area
//displays GIF rating under the GIF
//function that toggles from static to animate each time the user clicks on the image
//form that adds topics to the array and calls a function that retrives the input and 
// adds to the array plus creates a new button in the html


//GLOBAL VARIABLES
//-------------------------------------------------------------------------------
var topic = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"];
var apiKey = "2p8R9VP9l1bsccaVTBtjOpQ98GTBLgGw";


//MAIN PROCESS
//-------------------------------------------------------------------------------

//Once page loads, display all available buttons from topic array and wait
//for button click to launch get images()

$(function () {
    renderButtons();



    $(".animal").on("click", function () {
        console.log("button click recorded");
        var searchString = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchString + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(searchString);
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
            
        })
        
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;
            console.log (results);
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
                    animalImage.attr("src", results[i].images.fixed_height_still.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    (gifDiv).append(t);
                    (gifDiv).append(animalImage);

                    // // Prepending the gifDiv to the "#imagesDisplay" div in the HTML
                    // $("#imagesDisplay").prepend(gifDiv);
                }
            }
        });
    });

});

// when button is clicked, pass back the name of the button to be used in the search


//FUNCTIONS
//-------------------------------------------------------------------------------

//go through array and display values as buttons that can pull images from API when clicked
function renderButtons() {
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


