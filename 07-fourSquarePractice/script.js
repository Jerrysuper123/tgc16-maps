async function main() {
  function init() {
    window.addEventListener("DOMContentLoaded", async function () {
      let map = initMap();
      let markerGroup = L.layerGroup();
      let searchResultsWindow = document.querySelector("#search-results");

      let searchButton = document.querySelector("#search-btn");
      searchButton.addEventListener("click", async function () {
        let bounds = map.getBounds();
        let position = bounds.getCenter();
        let queryString = document.querySelector("#search-input").value;
        let searchResultArray = await search(
          position.lat,
          position.lng,
          queryString
        );

        markerGroup.clearLayers();
        searchResultsWindow.innerHTML = "";
        for (let eachPlace of searchResultArray) {
          let lat = eachPlace.geocodes.main.latitude;
          let lng = eachPlace.geocodes.main.longitude;
          let coordinate = [lat, lng];
          let marker = L.marker(coordinate);
          marker.bindPopup(eachPlace.name);
          marker.addTo(markerGroup);
          markerGroup.addTo(map);

          //append serch results
          let eachResult = document.createElement("div");
          eachResult.innerHTML = eachPlace.name;
          eachResult.className = "placeName";
          eachResult.addEventListener("click", function () {
            map.flyTo(coordinate, 15);
            marker.openPopup();
            // console.log(eachPlace.name);
          });
          searchResultsWindow.appendChild(eachResult);
        }

        // console.log(searchResultArray);

        // let placeArray = search();
      });
    });
  }

  init();

  function initMap() {
    let singapore = [1.29, 103.85]; // #1 Singapore latlng
    let map = L.map("singapore-map").setView(singapore, 13); // #2 Set the center point

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
    return map;
  }
}

main();
