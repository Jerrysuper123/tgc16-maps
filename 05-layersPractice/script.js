//center postion of the map
//array [lat, lng]

function getRandomLatLng(map) {
  let bounds = map.getBounds();

  //upper right and lower left in lat long
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();

  //cal the length of the width of the window using pointers
  let lngSpan = northEast.lng - southWest.lng;
  let latSpan = northEast.lat - southWest.lat;

  let randdomLng = Math.random() * lngSpan + southWest.lng;
  let randdomLat = Math.random() * latSpan + southWest.lat;

  return [randdomLat, randdomLng];
}

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

// let coordinate = getRandomLatLng(map);
// console.log(coordinate);

// let group = L.layerGroup();
// L.marker(getRandomLatLng(map)).add(group);
// group.addTo(map);

let group1 = L.layerGroup();
for (let i = 0; i < 50; i++) {
  let circle = L.circle(getRandomLatLng(map), {
    color: "red",
    fillColor: "red",
    fillOpacity: 0.5,
    radius: 500,
  });
  circle.addTo(group1);
}
group1.addTo(map);

let group2 = L.layerGroup();
for (let i = 0; i < 50; i++) {
  let circle = L.circle(getRandomLatLng(map), {
    color: "red",
    fillColor: "green",
    fillOpacity: 0.5,
    radius: 500,
  });
  circle.addTo(group2);
}
group2.addTo(map);

let overlays = {
  red: group1,
  green: group2,
};

document.querySelector("#btnToggle").addEventListener("click", function () {
  if (map.hasLayer(group1)) {
    map.removeLayer(group1);
  } else {
    map.addLayer(group1);
  }
});

L.control.layers({}, overlays).addTo(map);
