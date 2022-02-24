const express = require("express");
const route = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

const dbschema = new mongoose.Schema({
  name: { type: String },
  genre: { type: String },
});

const MongModel = mongoose.model("Genres", dbschema);

route.get("/", async (req, res) => {
  const genre = await MongModel.find().sort("genre");
  res.send(genre);
});

route.get("/:id", async (req, res) => {
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await MongModel.findById(req.params.id);
    if (!user) return res.status(404).send("genre not found");
    res.send(user);
  }else {
    res.status(400).send("invalid type of id")
  }
});

route.post("/",  (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  
  console.log("",result)
  // if (result.error) {
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }
  // let user = new MongModel({
  //   name: req.body.name,
  //   genre: req.body.genre,
  // });
  // user = await user.save();
  // res.send(result);
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
  const user = await MongModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
    }
  );
  if (!user) {
    res.status(400).send("user not found");
  }

  res.send(user);
});

route.delete("/:id", async (req, res) => {
  const user = await MongModel.findByIdAndRemove(req.params.id);
  if (!user) return res.status(400).send("user not found");
  res.send(user);
});
module.exports = route;
