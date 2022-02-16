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

let marker = L.marker([1.4043, 103.793]);
marker.bindPopup("Singapore Zoo");
marker.addTo(map);

let homeMarker = L.marker([1.3472, 103.749]);
homeMarker.addEventListener("click", function () {
  alert("home truely home");
});
homeMarker.addTo(map);

let bukitTimahCircle = L.circle([1.3294, 103.8021], {
  color: "red",
  fillColor: "green",
  fillOpacity: 0.5,
  radius: 500,
});
bukitTimahCircle.addTo(map);
