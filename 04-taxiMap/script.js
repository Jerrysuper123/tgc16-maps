//center postion of the map
//array [lat, lng]

// setInterval(console.log("times up"), 2000);

async function getTaxi() {
  let response = await axios.get(
    "https://api.data.gov.sg/v1/transport/taxi-availability"
  );
  return response.data.features[0].geometry.coordinates;
}

async function showTaxionMap() {
  let taxiCoordinates = await getTaxi();
  // console.log(taxiCoordinates);
  let markerClusterLayer = L.markerClusterGroup();
  //lng, lat
  for (let t of taxiCoordinates) {
    let lat = t[1];
    let lng = t[0];
    let marker = L.marker([lat, lng]);
    marker.addTo(markerClusterLayer);
  }
  markerClusterLayer.addTo(map);
}

window.addEventListener("DOMContentLoaded", async function () {
  //wait for taxi loading to finish
  //no need to await, before we only need to load all markers
  //we do not need to wait for it, there is no more lines after that to execute

  showTaxionMap();
  //every 30 second to call showTaxionMap again
  //setInterval accepts an anonymous function
});

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

//
