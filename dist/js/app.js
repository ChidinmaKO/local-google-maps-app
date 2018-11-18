var map,markers=[],placeMarkers=[];function initMap(){map=new google.maps.Map(document.getElementById("map"),{center:{lat:52.3792671,lng:4.902102},zoom:13,styles:[{featureType:"administrative",elementType:"labels.text.stroke",stylers:[{color:"$white"},{weight:4}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#e85113"}]},{featureType:"transit.station",stylers:[{weight:7},{hue:"#e85113"}]},{featureType:"water",stylers:[{color:"#a1cdfc"}]},{featureType:"water",elementType:"labels.text.stroke",stylers:[{lightness:100},{saturation:30}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{lightness:-100}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f49935"},{lightness:-40}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#efe9e4"},{lightness:-25}]},{featureType:"poi",elementType:"geometry",stylers:[{visibility:"on"},{color:"#f0e4d3"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#fad959"},{lightness:40}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]}],mapTypeId:"terrain"});var e=document.getElementById("search"),t=new google.maps.places.SearchBox(e);map.addListener("bounds_changed",function(){t.setBounds(map.getBounds())});new google.maps.InfoWindow;t.addListener("places_changed",function(){searchBoxPlaces(this)}),document.getElementById("button").addEventListener("click",searchPlaces)}function searchBoxPlaces(e){hideMarkers(placeMarkers);var t=e.getPlaces();0!=t.length&&markersForPlaces(t)}function searchPlaces(){var e=map.getBounds();hideMarkers(placeMarkers),new google.maps.places.PlacesService(map).textSearch({query:document.getElementById("search").value,bounds:e},function(e,t){t===google.maps.places.PlacesServiceStatus.OK&&markersForPlaces(e)})}function hideMarkers(e){for(var t=0;t<e.length;t++)e[t].setMap(null)}function markersForPlaces(e){for(var t=new google.maps.LatLngBounds,a=0;a<e.length;a++){var r=e[a],o={url:r.icon,size:new google.maps.Size(70,70),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(17,34),scaledSize:new google.maps.Size(25,25)},s=new google.maps.Marker({map:map,icon:o,animation:google.maps.Animation.DROP,title:r.name,position:r.geometry.location,id:r.place_id}),n=new google.maps.InfoWindow;s.addListener("click",function(){n.marker==this?console.log("This infowindow is already on this marker"):getPlacesDetails(this,n)}),placeMarkers.push(s),r.geometry.viewport?t.union(r.geometry.viewport):t.extend(r.geometry.location)}map.fitBounds(t)}function placeMarkers(){}function getPlacesDetails(r,o){new google.maps.places.PlacesService(map).getDetails({placeId:r.id},function(e,t){if(t===google.maps.places.PlacesServiceStatus.OK){o.marker=r;var a="<div>";e.name&&(a+="<strong>"+e.name+"</strong>"),e.formatted_address&&(a+="<br><br>"+e.formatted_address),e.formatted_phone_number&&(a+="<br>"+e.formatted_phone_number),e.opening_hours&&(a+="<br><br><strong>Hours:</strong><br>"+e.opening_hours.weekday_text[0]+"<br>"+e.opening_hours.weekday_text[1]+"<br>"+e.opening_hours.weekday_text[2]+"<br>"+e.opening_hours.weekday_text[3]+"<br>"+e.opening_hours.weekday_text[4]+"<br>"+e.opening_hours.weekday_text[5]+"<br>"+e.opening_hours.weekday_text[6]),e.photos&&(a+='<br><br><img src="'+e.photos[0].getUrl({maxHeight:200,maxWidth:200})+'">'),a+="</div>",o.setContent(a),o.open(map,r),o.addListener("closeclick",function(){o.marker=null})}})}
//# sourceMappingURL=maps/app.js.map
