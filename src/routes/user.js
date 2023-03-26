const express = require("express");
const User = require("../models/userModel");
const userRoute = new express.Router();

userRoute.post("/user", async (req, res) => {
  const newUser = new User(req.body);

  try {
    let result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

userRoute.get("/users", async (req, res) => {
  try {
    let result = await User.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRoute.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await User.findById(_id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRoute.put("/users/:id", async (req, res) => {
  const allowedFields = ["name", "age", "email", "password"];
  const changerequest = Object.keys(req.body);

  const isValid = changerequest.every((field) => allowedFields.includes(field));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid request body" });
  }

  const _id = req.params.id;
  try {
    const result = await User.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
      returnDocument: "after",
    });
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
userRoute.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await User.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRoute;
