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
        
        if(response.length == 0){
            $(".gallery").append("<p>").addClass("alerts").css("color","white").text("Artist not found. Be sure to use First and Last Name");   
          }

    })

};