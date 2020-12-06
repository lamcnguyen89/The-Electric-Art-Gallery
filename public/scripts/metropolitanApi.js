var baseMetropolitanURL = "https://collectionapi.metmuseum.org/public/collection/v1/search?q="; // For Getting Object IDs associated with a particular artist
var MetropolitanImageURL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" // For extracting images and the artwork information from each particulat Object ID belonging to that artist.
let artistKey = "";


$("#searchBtn").on("click", function() {

  artistKey = $("#searchBar").val();
  console.log("Artist:" + artistKey);
  $("#searchBar").val("");

  searchArtist(artistKey);

});

function searchArtist(artist, isSearchAgain = false) { //es6 uses C# default paramenters, calling function can override

  storeArtist(artist); 

  if(isSearchAgain == true  && artistKey == null || artistKey.length == 0){ //artistKey is null when doing searchAgain
    artistKey = artist;
  }
  
  $(".gallery").empty()
  var queryURLMet = baseMetropolitanURL + artistKey;
  
// Start of API Pull Request
$.ajax({
    url: queryURLMet,
    method: "GET"
  }).then(function(response) {

        var objectID = response.objectIDs; // This is an object containing the ID Numbers for the works of a particular artist.

        // Because of the way the Metropolitan Museum of Art API is set up, we have to do 2 sets of ajax requests:
          // The first request was to get all the object IDs associated with the particular artist.
          // The second set of requests is where we have to loop through the list of object IDs, make a single request for each ID, and then get the info we need.
        
        // The loop to get the images and data for the artist. We're only doing a maximum of 50 images because there are often hundreds of images
        for (let i = 0; i < 50 ; i++) {
        
            $.ajax({
              url: MetropolitanImageURL + objectID[i],
              method: "GET"
            })
            
            .then(function(response) {

                    if(response.length == 0){
                      $(".gallery").append("<p>").addClass("alerts").css("color","white").text("Artist not found. Be sure to use First and Last Name");   
                    }

                    // Variables that contain the artist information taken from the Metropolitan API"
                    var artTitle = response.title;
                    var artistName = response.artistDisplayName;
                    var artistCulture = response.culture;
                    var artImageURL = response.primaryImage;

                    // Create Elements for the image card:
                    var mainImgDiv = $("<div>").attr("class","card m-3" );
                    var mainImgCardBody = $("<div>").attr("class","card-body");
                    var cardTitle=$("<h5>").attr("class","card-title").text("Artwork Title: " + artTitle);
                    var cardName=$("<p>").attr("class","card-text").text("Artist Name: " + artistName);
                    var cardCulture=$("<p>").attr("class","card-text").text("Artist Ethnicity: " + artistCulture);
                    var artImageSrc = $("<img>").attr("src", artImageURL).attr("class", "card-img-top");

                    // Append Information to the Card Text Box:
                    mainImgCardBody.append([
                        cardTitle,
                        cardName,
                        cardCulture
                    ]);
                                          
                    // Append Image and Card Text Box to the Main Card:
                    mainImgDiv.append([
                        artImageSrc,
                        mainImgCardBody
                    ]);    

                    // Append Card to the a Div element created on the html page.
                    $(".gallery").append(mainImgDiv);
                });
        }        
  });
};