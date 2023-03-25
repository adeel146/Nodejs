const express = require("express");
require("./db/mongodb");
const User = require("./models/userModel");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/user", (req, res) => {
  const newUser = new User(req.body);

  newUser
    .save()
    .then(() => {
      res.send(newUser);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
