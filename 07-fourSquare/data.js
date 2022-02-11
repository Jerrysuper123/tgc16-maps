const API_BASE = "https://api.foursquare.com/v3";
const API_KEY = "fsq3IlRHeltunGxA6ZbJYF2YOw4r0LScdTVjqhXC9mhjJOM=";

async function search(lat, lng, query) {
  let ll = lat + "," + lng;

  let response = await axios.get(API_BASE + "/places/search", {
    params: {
      ll: ll,
      v: "20220211",
      query: query,
    },
    headers: {
      // to insert api
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  return response.data;
}
