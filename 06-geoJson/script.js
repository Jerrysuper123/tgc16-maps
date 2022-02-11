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

async function loadCyclingPath() {
  let response = await axios.get("data/cycle.geojson");
  //first argu is the data
  // second argu is a config object
  let cyclingLayer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      //feature - store info about feature
      //layer - is the line the shape being drawn on the map
      console.log(feature.properties); //inspect properties of each feature
      //pop up properties description of each layer
      // layer.bindPopup(feature.properties.Description);

      let dummyDiv = document.createElement("div");
      dummyDiv.innerHTML = feature.properties.Description;
      let columns = dummyDiv.querySelectorAll("td");
      // console.log(columns);
      let pathName = columns[0].innerHTML;
      let agency = columns[1].innerHTML;
      layer.bindPopup(`
        <ul>
          <li>${pathName}</li>
          <li>${agency}</li>
        </ul>
      `);
    },
  }).addTo(map);

  cyclingLayer.setStyle({
    color: "red",
  });

  return cyclingLayer;
}

async function loadNparks() {
  let response = await axios.get("data/nparks.geojson");
  //first argu is the data
  // second argu is a config object to configure layer using feature
  let nParkLayer = L.geoJson(response.data, {
    onEachFeature: function (feature, layer) {
      //feature - store info about feature (each line is a feature)
      //layer - is the line the shape being drawn on the map
      // console.log(feature.properties); //inspect properties of each feature
      //pop up properties description of each layer
      // layer.bindPopup(feature.properties.Description);

      let dummyDiv = document.createElement("div");
      dummyDiv.innerHTML = feature.properties.Description;
      let columns = dummyDiv.querySelectorAll("td");
      // console.log(columns);
      let parkName = columns[0].innerHTML;
      let pathType = columns[1].innerHTML;
      let loop = columns[2].innerHTML;
      layer.bindPopup(`
        <ul>
          <li>park: ${parkName}</li>
          <li>type: ${pathType}</li>
          <li>loop: ${loop}</li>
        </ul>
      `);
    },
  }).addTo(map);

  nParkLayer.setStyle({
    color: "green",
  });

  return nParkLayer;
}

window.addEventListener("DOMContentLoaded", async function () {
  loadCyclingPath();
  // loadCyclingPath();
  loadNparks();
});
