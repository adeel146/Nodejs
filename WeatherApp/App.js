const request = require("request");
const geolocation = require("./utilis");

let input = process.argv[2];

geolocation.getcordinates(input, (error, data) => {
  if (error) {
    return console.log(error);
  }
  console.log(data);
});
