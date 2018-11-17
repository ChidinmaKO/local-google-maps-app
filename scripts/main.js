var map;

var markers = [];

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

    var searchBox = new google.maps.places.SearchBox(
        document.getElementById('search')
    );

    var infoWindow = new google.maps.InfoWindow();

    var defaultIcon;
    var highlightedIcon;
}





