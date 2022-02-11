//center postion of the map
//array [lat, lng]
let singapore = [1.29, 103.85];

//create the map
//L is the leaflet object in global scope (Leaflet js provides a global variable L)
//l.map() crete a map object (contain all functinalities/data)
//it takes one arg (only id of the div)
//setview where singapore is with zoom 13
let map = L.map("singaporeMap").setView(singapore, 13);

// setup the tile layers
//set up the drawing of the map
//google map breaks map into tiles
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    // you have to get accessToken from mapbox
    // there is a limit how much u can access
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", //demo access token
  }
).addTo(map);

// map.setView(singapore);

//create marks to the map
//anything added to map is called overlay
//1) create a marker
let singaporeMarker = L.marker([1.29, 103.85]);
let clementiMarker = L.marker([1.3162, 103.7649]);

//2)add the marker to the map
// map.add(clementiMarker);
singaporeMarker.addTo(map);
// clementiMarker.addTo(map);
clementiMarker.addTo(map);

L.marker([1.2494, 103.8303]).addTo(map);
//you can customize marker on the map

// add a pop up box to the singapore box, you can style the h1 using css
singaporeMarker.bindPopup(`<h1>singapore</h1>
  <p>Sentosa is an island resort off Singapore’s southern coast, connected to the city by road, cable car, pedestrian boardwalk and monorail. By Sentosa Station, Tiger Sky Tower has panoramic views that can stretch as far as Indonesia. On the south coast, Palawan Beach is lined with food stalls and bars, and has a suspension bridge to a small offshore island. Palm-lined, crescent-shaped Tanjong Beach is more</p>
`);

//you can add event listener to the marker
clementiMarker.addEventListener("click", function () {
  alert("my house is here");
});

// you can set the circle marker of the map
let circle = L.circle([1.3294, 103.8021], {
  color: "red",
  fillColor: "#f03",
  fillOpacity: 0.5,
  radius: 500,
});

circle.addTo(map);

//if there are too many markers, too crowded
//use cluster to
