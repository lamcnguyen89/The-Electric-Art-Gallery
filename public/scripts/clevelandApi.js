var clevelandArtURL = "https://openaccess-api.clevelandart.org/api/artworks/?artists="
let artistKey = "";

$("#searchBtn").on("click", function() {
    
    artistKey = $("#searchBar").val();
    //store artist in localStorage memory
    console.log("Artist:" + artistKey);
    $("#searchBar").val("");
        
    searchArtist(artistKey);
    
});

function searchArtist(artist, isSearchAgain = false) {  
    storeArtist(artist);
    
    if(isSearchAgain == true  && artistKey == null || artistKey.length == 0){ //artistKey is null when doing searchAgain
        artistKey = artist;
    }

    $(".gallery").empty()
    var queryURLCleveland= clevelandArtURL + artistKey;

    // Start of API Pull Request
    $.ajax({
        url: queryURLCleveland,
        method: "GET"
    })

    .then(function(response) {

        console.log(response.data)

        if(response.data.length == 0){
            $(".gallery").append("<p>").addClass("alerts").css("color","white").text("Artist not found. Be sure to use First and Last Name");   
          }
 
            // This loop will theoretically generate images by pulling down from the server:
            for (let i = 0; i < response.data.length; i++) {
 
                var artTitle = response.data[i].title;
                var artistName = response.data[i].creators[0].description;
                var artistCulture = response.data[i].culture;
                var artImageURL =  response.data[i].images.web.url;


                // Create function to generate elements:
                function createElements() {

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
                };

                createElements();

        };

        

    })

};