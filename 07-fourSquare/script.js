//entry function of our application, no function outside this main functions

async function main() {
  //nested function
  //init can only be called in the main function
  //init to initalize our application
  //ALL EVENTLISTENER ARE IN INIT FUNCTION
  function init() {
    let map = initMap();
    window.addEventListener("DOMContentLoaded", function () {});
  }

  init();

  function initMap() {
    let singapore = [1.29, 103.85];
    let map = L.map("singapore-map");
    map.setView(singapore, 13);

    // setup tilelayer
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg",
      }
    ).addTo(map);

    return map;
  }
}

main();
