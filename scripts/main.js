var map;

var markers = [];

var placeMarkers = [];

function initMap() {
// Array of styles to be used in the map
    var styles = [
        {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                {color: '$white'},
                {weight: 4}
            ]
        },
        {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{color: '#e85113'}]
        },
        {
            featureType: 'transit.station',
            stylers: [
                {weight: 7},
                {hue: '#e85113'}
            ]
        },
        {
            featureType: 'water',
            stylers: [{color: '#a1cdfc'}]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {lightness: 100}, 
                {saturation: 30}
            ]
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{lightness: -100}]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [
                {color: '#f49935'},
                {lightness: -40}
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {color: '#efe9e4'},
                {lightness: -25}
            ]
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {visibility: 'on'},
                {color: '#f0e4d3'}
            ]
        },
        {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                {visibility : 'off'}
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [
                {color: '#fad959'},
                {lightness: 40}
            ]
        },
        {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [
                {visibility: 'off'}
            ]
        }   
    ]

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:52.3792671, lng:4.902102},
        zoom: 13,
        styles: styles,
        mapTypeId: 'terrain'
    });

    var textInput = document.getElementById('search');
    var searchBox = new google.maps.places.SearchBox(textInput);

    // Bias the users SearchBox results towards the current maps viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var infoWindow = new google.maps.InfoWindow();

    var defaultIcon;
    var highlightedIcon;

    searchBox.addListener('places_changed', function() {
        searchBoxPlaces(this);
    });

    /* 
     * listen for the click event fired when the 
     *   user selects a place and clicks go for that place.
    */
    document.getElementById('button').addEventListener('click', searchPlaces);
}

function searchBoxPlaces(searchBox) {
    hideMarkers(placeMarkers);
    var places = searchBox.getPlaces();
    if (places.length == 0) {
        return;
    } else {
        // for each place, get the icon, name and location.
        markersForPlaces(places);
    }
}

// when the user clicks on 'go', it'd do a nearby search using the inputted place or string.
function searchPlaces() {
    var bounds = map.getBounds();
    hideMarkers(placeMarkers);
    var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
        query: document.getElementById('search').value,
        bounds: bounds
    }, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            markersForPlaces(results);
        }
    });
}

function hideMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}

// creates markers
function markersForPlaces(places) {
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < places.length; i++) {
        var place = places[i];
        var icon = {
            url: place.icon,
            size: new google.maps.Size(70, 70),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        //  creates a marker for each place
        var marker = new google.maps.Marker( {
            map: map,
            icon: icon,
            animation: google.maps.Animation.DROP,
            title: place.name,
            position: place.geometry.location,
            id: place.place_id
        });

        var placeInfoWindow = new google.maps.InfoWindow();
        marker.addListener('click', function() {
            if (placeInfoWindow.marker == this) {
                console.log("This infowindow is already on this marker");
            } else {
                getPlacesDetails(this, placeInfoWindow);
            }
        });

        placeMarkers.push(marker);

        if (place.geometry.viewport) {
            // only geocodes have viewports
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    }
    map.fitBounds(bounds);
}

function placeMarkers() {}

// for the place details
function getPlacesDetails(marker, infowindow) {
    var service = new google.maps.places.PlacesService(map);
    service.getDetails( {
        placeId: marker.id
    }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // set the marker property on this infowindow
            infowindow.marker = marker;
            var innerHTML = '<div>';

            if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br><br>' + place.formatted_address;
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                place.opening_hours.weekday_text[0] + '<br>' +
                place.opening_hours.weekday_text[1] + '<br>' +
                place.opening_hours.weekday_text[2] + '<br>' +
                place.opening_hours.weekday_text[3] + '<br>' +
                place.opening_hours.weekday_text[4] + '<br>' +
                place.opening_hours.weekday_text[5] + '<br>' +
                place.opening_hours.weekday_text[6];
            }
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    {maxHeight:200, maxWidth:200}
                ) + '">';
            }
            innerHTML += '</div>';
            infowindow.setContent(innerHTML);
            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
        }
    });
}

/* TODO: 
 * If more than one photo, make it scrollable with icons such as next and previous
 * Add listings to the listings div
*/