let singapore = [1.29, 103.85]; // #1 Singapore latlng
let map = L.map("map").setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw", //demo access token
  }
).addTo(map);

// function getRandomLatLng(map) {
//   // get the boundaries of the map
//   let bounds = map.getBounds();
//   let southWest = bounds.getSouthWest();
//   let northEast = bounds.getNorthEast();
//   let lngSpan = northEast.lng - southWest.lng;
//   let latSpan = northEast.lat - southWest.lat;

//   let randomLng = Math.random() * lngSpan + southWest.lng;
//   let randomLat = Math.random() * latSpan + southWest.lat;

//   return [randomLat, randomLng];
// }

// let markerClusterGroup = L.markerClusterGroup();

// let m;
// for (let i = 0; i < 1000; i++) {
//   m = L.marker(getRandomLatLng(map));
//   m.addTo(markerClusterGroup);
// }

// markerClusterGroup.addTo(map);

//get data function, shoow onMap (markeer to cluster group to map)
//window, set time interval in of 35seconds, console log every

async function getTaxiData() {
  let response = await axios.get(
    "https://api.data.gov.sg/v1/transport/taxi-availability"
  );
  let coordinateArray = response.data.features[0].geometry.coordinates;
  // console.log(coordinateArray);
  return coordinateArray;
}

async function showTaxiOnMap() {
  let coordinateArray = await getTaxiData();
  // when show taxi again,clear previous layers

  markerClusterLayer.clearLayers();

  for (let coordinate of coordinateArray) {
    let lat = coordinate[1];
    let lng = coordinate[0];
    let marker = L.marker([lat, lng]);
    marker.addTo(markerClusterLayer);
  }
}

// getTaxiData();
let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(map);

window.addEventListener("DOMContentLoaded", function () {
  showTaxiOnMap();

  // every 35 seconds, showTaxiOnMap is set to reset itself
  //setInterval takes in an anonymous function(reference to the function, not calling the function itself)
  setInterval(showTaxiOnMap, 35000);

  let count = 0;
  setInterval(function () {
    count++;
    console.log(count % 36);
  }, 1000);
});
