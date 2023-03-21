const request = require("request");

const geolocation = (location, callback) =>
  request(
    {
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=pk.eyJ1IjoiYWRlZWwxMTMiLCJhIjoiY2xmZGdsbm15MnN3ejN6bzQwcWZ2cDhmdiJ9.YEXFGBXnK30mRynJmMOUhg&limit=1`,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback(error, undefined);
      } else if (response.body.features.length === 0) {
        callback(null, "Not Found");
      } else {
        let latitude, longtitude;
        latitude = response.body.features[0].center[1];
        longtitude = response.body.features[0].center[0];
        callback(null, { latitude, longtitude });
      }
    }
  );
const getcordinates = (location, callback) =>
  request(
    {
      url: `http://api.weatherstack.com/current?access_key=3f9679e13f96b505fc6b34b354491e06&query=${encodeURIComponent(
        location
      )}`,
      json: true,
    },
    function (error, response) {
      if (error) {
        callback(error, undefined);
      } else if (response.body.error) {
        callback(null, response.body.error.info);
      } else {
        console.log(response.body.location.country);
        console.log(
          `Today Temprature is ${response.body.current.temperature} and humidity is ${response.body.current.humidity} weather  ${response.body.current.weather_descriptions[0]} `
        );
      }
    }
  );

module.exports = { geolocation, getcordinates };
