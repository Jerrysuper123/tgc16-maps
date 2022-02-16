// alert("heelp");

let singapore = [1.29, 103.85]; // #1 Singapore latlng
let map = L.map("map").setView(singapore, 3); // #2 Set the center point

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

async function getQuakeData() {
  let response = await axios.get(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"
  );
  let featuresArray = response.data.features;

  for (let feature of featuresArray) {
    let lat = feature.geometry.coordinates[1];
    let lng = feature.geometry.coordinates[0];

    let marker = L.marker([lat, lng]);
    marker.bindPopup(feature.properties.place);
    marker.addTo(markerClusterLayer);
  }
}

let markerClusterLayer = L.markerClusterGroup();
markerClusterLayer.addTo(map);

window.addEventListener("DOMContentLoaded", function () {
  getQuakeData();
});
