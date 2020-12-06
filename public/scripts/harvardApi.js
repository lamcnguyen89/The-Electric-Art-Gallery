var harvardAPIkey = "55f7f2b0-b577-11ea-a0ef-01159045190f";
var baseHarvardURL = "https://api.harvardartmuseums.org/object?q=displayname:";

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
        var queryHarvardURL = baseHarvardURL + artist +"&size=100&apikey=" + harvardAPIkey;
        console.log("Harvard API URL: " + queryHarvardURL)

        // Start of API Pull Request
        $.ajax({
            url: queryHarvardURL,
            method: "GET"     
        })

        .then(function(response) {

            console.log("Object Url: " + queryHarvardURL);
            console.log("Records length: " + response.records.length);
            
            if(response.records.length == 0){
                $(".gallery").append("<p>").addClass("alerts").css("color","white").text("Artist not found. Be sure to use First and Last Name");   
            }

 
            // This loop will theoretically generate images by pulling down from the server:
            for (let i = 0; i < response.records.length; i++) {
                    var harvardImages = response.records[i];
                    var primaryImage = harvardImages.primaryimageurl;
                    var baseImage = harvardImages.baseimageurl;
                    // var urlImage = harvardImages.url;
                    var artTitle = harvardImages.title;
                    var artistName = harvardImages.people[0].name;
                    var artistCulture = harvardImages.people[0].culture; 

                    // Create function to generate elements:
                    function createElements() {

                        // Create Elements for the image card:
                        var mainImgDiv = $("<div>").attr("class","card m-3" );
                        var mainImgCardBody = $("<div>").attr("class","card-body");
                        var cardTitle=$("<h5>").attr("class","card-title").text("Artwork Title: " + artTitle);
                        var cardName=$("<p>").attr("class","card-text").text("Artist Name: " + artistName);
                        var cardCulture=$("<p>").attr("class","card-text").text("Artist Ethnicity: " + artistCulture);
                        
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

                    // Have to use this if else statement because Harvard stores images in 3 possible keys:
                    if (primaryImage) {
                        var artImageSrc = $("<img>").attr("src", primaryImage).attr("class", "card-img-top");
                        createElements();
                        
                    } else if (baseImage) {
                        var artImageSrc = $("<img>").attr("src", baseImage).attr("class", "card-img-top");
                        createElements();
                        
                    } else {
                        // var artImageSrc = $("<img>").attr("src", urlImage).attr("class", "urlImage");
                        // createElements(); 
                    
                        
                    };  
            };

        })

};


