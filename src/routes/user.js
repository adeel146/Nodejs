const express = require("express");
const User = require("../models/userModel");
const userRoute = new express.Router();
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/auth");

userRoute.post("/user", async (req, res) => {
  const newUser = new User(req.body);

  try {
    let result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});
userRoute.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findUserByCredentials(email, password);
    const token = await user.generateAuthToken();
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
userRoute.post("/user/logout", verifyToken, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Successfully Logout");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

userRoute.get("/users", verifyToken, async (req, res) => {
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
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    changerequest.forEach((field) => (user[field] = req.body[field]));
    await user.save();
    res.send(user);
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
