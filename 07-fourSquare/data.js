const API_BASE_URL = "https://api.foursquare.com/v3";
const API_KEY = "fsq3IlRHeltunGxA6ZbJYF2YOw4r0LScdTVjqhXC9mhjJOM=";

async function search(lat, lng, query) {
  let ll = lat + "," + lng;

  // example:
  // if ll is "103,31"
  // and query is "chicken rice"
  // then the query string will be "?ll=103,31&query=chicken rice&v=20220211"
  //we have to give to foursquare url + /places/search + params + headers as required by foursqure
  let response = await axios.get(API_BASE_URL + "/places/search", {
    params: {
      ll: ll,
      v: "20220211", // lock the version of foursquare to the one on this date,
      query: query,
      radius: 100000,
    },
    //must pass in header as below according to foursquare API
    headers: {
      Accept: "application/json",
      Authorization: API_KEY,
    },
  });
  return response.data;
}

// REQUEST
// curl --request GET \
//      --url 'https://api.foursquare.com/v3/places/search?query=chicken%20rice&ll=1.29%2C103.85' \
//      --header 'Accept: application/json' \
//      --header 'Authorization: fsq3IlRHeltunGxA6ZbJYF2YOw4r0LScdTVjqhXC9mhjJOM='
