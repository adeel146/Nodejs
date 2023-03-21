const path = require("path");
const express = require("express");
const request = require("request");

const app = express();
const port = process.env.PORT || 3000;

const publicdirectory = path.join(__dirname, "../public");

app.use(express.static(publicdirectory));

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send("Kindly provide a valid location");
  } else {
    request(
      {
        url: `http://api.weatherstack.com/current?access_key=3f9679e13f96b505fc6b34b354491e06&query=${encodeURIComponent(
          req.query.location
        )}`,
        json: true,
      },
      function (error, response) {
        let data;
        if (error) {
          data = "Error Occured";
        } else if (response.body.error) {
          data = response.body.error.info;
        } else {
          data = response.body;
        }
        res.send(data);
      }
    );
  }
});

app.get("/weather/*", (req, res) => {
  res.send("Error not Found after weather 404");
});

app.get("*", (req, res) => {
  res.send("Error not Found 404");
});

app.listen(port, () => {
  console.log("server is running on port" + port);
});
