// REQUEST
// curl --request GET \
//      --url 'https://api.foursquare.com/v3/places/search?query=chicken%20rice&ll=1.29%2C103.85' \
//      --header 'Accept: application/json' \
//      --header 'Authorization: fsq3IlRHeltunGxA6ZbJYF2YOw4r0LScdTVjqhXC9mhjJOM='

let BASE_URL = "https://api.foursquare.com/v3/places/search";
let API_KEY = "fsq3IlRHeltunGxA6ZbJYF2YOw4r0LScdTVjqhXC9mhjJOM=";

async function search(lat, lng, query) {
  let ll = lat + "," + lng;
  let response = await axios.get(BASE_URL, {
    params: {
      ll: ll,
      query: query,
      v: "20220212",
      radius: 5000,
    },

    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });

  return response.data.results;
}
