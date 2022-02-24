const express = require("express");
const route = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const dbschema = mongoose.schema({
  name: { type: String, required: true, min: 1, max: 20 },
  genre: { type: String, required: true, min: 1, max: 20 },
});

const MongModel= mongoose.model("Genres",dbschema)

route.get("/", (req, res) => {
  MongModel.find
  res.send(data);
});

route.get("/:genre", (req, res) => {
  const user = data.filter((i) => i.genre == req.params.genre);
  if (user.length == 0) return res.status(404).send("genre not found");
  res.send(user);
});

route.post("/", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = {
    id: data.length + 1,
    name: req.body.name,
  };
  data.push(user);
  res.send(user);
});

route.put("/:id", (req, res) => {
  const user = data.find((i) => i.id == req.params.id);
  if (!user) {
    res.status(400).send("user not found");
  }

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  user.name = req.body.name;
  res.send(user);
});

route.delete("/:id", (req, res) => {
  const user = data.find((i) => i.id == req.params.id);
  if (!user) return res.status(400).send("user not found");
  const index = data.indexOf(user);
  data.splice(index, 1);
  res.send(user);
});
module.exports = route;
