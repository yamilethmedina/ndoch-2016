$(function() {
    $.ajax({
        dataType: "json",
        url: '/miami-dade-low-cost-developments.json',
        success: populateMap,
        error: console.log
    });

    function populateMap(response) {
        var mymap = L.map('main-map').setView([25.82, -80.23], 12);
        var addressDisplay = '';

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
        }).addTo(mymap);
        
        response.results.forEach(function(development) {
            addressDisplay = '<b>' + development.name + '</b>' + '<br>' +
                development.address + '<br>' +
                development.city + ', '+ development.state + ' ' + development.zip + '<br>';
            L.marker([development.lat, development.lng])
            .addTo(mymap)
            .bindPopup(addressDisplay);
        });
    }
});
