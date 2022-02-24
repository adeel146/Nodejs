const express = require("express");
const route = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const dbschema = new mongoose.Schema({
  name: { type: String, required: true, min: 1, max: 20 },
  genre: { type: String, required: true, min: 1, max: 20 },
});

const MongModel = mongoose.model("Genres", dbschema);

route.get("/", async (req, res) => {
  const genre = await MongModel.find().sort("genre");
  res.send(genre);
});

route.get("/:genre", (req, res) => {
  // const result = await MongModel.find
  const user = data.filter((i) => i.genre == req.params.genre);
  if (user.length == 0) return res.status(404).send("genre not found");
  res.send(user);
});

route.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = new MongModel({
    name: req.body.name,
    genre:
  });
  user.save();
  res.send(user);
});

route.put("/:id", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = await MongModel.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!user) {
    res.status(400).send("user not found");
  }

  res.send(user);
});

route.delete("/:id", async(req, res) => {
  const user = await MongModel.findByIdAndRemove(req.params.id);
  if (!user) return res.status(400).send("user not found");
  res.send(user);
});
module.exports = route;
