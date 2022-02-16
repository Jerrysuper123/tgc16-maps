// alert("heelp");

let singapore = [1.29, 103.85]; // #1 Singapore latlng
let map = L.map("map").setView(singapore, 13); // #2 Set the center point

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

let group = L.layerGroup();

async function readCoordinates() {
  let hdbResponse = await axios.get("hdb.json");
  let hdbArray = hdbResponse.data;

  let hdbGroup = L.layerGroup();
  for (let hdb of hdbArray) {
    let m = L.marker(hdb.coordinates);
    m.bindPopup(hdb.name);
    m.addTo(hdbGroup);
  }

  let natureResponse = await axios.get("nature.json");
  let natureArray = natureResponse.data;

  let natureGroup = L.layerGroup();
  for (let nature of natureArray) {
    let m = L.marker(nature.coordinates);
    m.bindPopup(nature.name);
    m.addTo(natureGroup);
  }

  let mailResponse = await axios.get("mails.json");
  let mailArray = mailResponse.data;

  let mailGroup = L.layerGroup();
  for (let mail of mailArray) {
    let m = L.marker(mail.coordinates);
    m.bindPopup(mail.name);
    m.addTo(mailGroup);
  }

  // hdbGroup.addTo(map);

  let overlays = {
    hdb: hdbGroup,
    nature: natureGroup,
    mail: mailGroup,
  };

  L.control.layers({}, overlays).addTo(map);
}

window.addEventListener("DOMContentLoaded", async function () {
  //   loadCyclingPath();
  // loadCyclingPath();
  readCoordinates();
});
