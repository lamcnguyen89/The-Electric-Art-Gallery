// Array of all  the museum locations that we use in this application:
var galArr = [
    {
        name: "Harvard Art Museum",
        lat: 42.3740937,
        lng: -71.1165522
    },
    {
        name: "Metropolitan Museum of Art",
        lat: 40.7794406,
        lng: -73.965438
    },
    {
        name: "Cleveland Museum of Art",
        lat: 41.508951,
        lng: -81.611614
    }
]

function myMap() {

    // Variable to set Map Properties:
    var mapProp= {
    center:new google.maps.LatLng(41.3083,-72.9279),
    zoom: 7,
    };

    // Variable to capture of div element on the html page and display the google map
    var map = new google.maps.Map(document.getElementById("map"),mapProp);


    var markerArr = [];

    for (let i = 0; i < galArr.length; i++) {
        const temp = new google.maps.LatLng(galArr[i].lat, galArr[i].lng)
        markerArr.push(new google.maps.Marker({
            position: new google.maps.LatLng(galArr[i].lat, galArr[i].lng),
            map: map,
            title: galArr[i].name
        }))
    }

    map.addListener('center_changed', function () {
        // 3 seconds after the center of the map has changed, pan back to the
        // marker.
        window.setTimeout(function () {
            map.panTo(marker.getPosition());
        }, 3000);
    });

}

