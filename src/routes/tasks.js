const express = require("express");
const Tasks = require("../models/taskModel");
const taskRoute = new express.Router();

taskRoute.post("/task", async (req, res) => {
  const newTask = new Tasks(req.body);
  try {
    let result = await newTask.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

taskRoute.get("/tasks", async (req, res) => {
  try {
    let result = await Tasks.find({});
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send();
  }
});

taskRoute.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    let result = await Tasks.findById(_id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send();
  }
});

taskRoute.put("/tasks/:id", async (req, res) => {
  const allowedFields = ["description", "completed"];
  const changerequest = Object.keys(req.body);

  const isValid = changerequest.every((field) => allowedFields.includes(field));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid request body" });
  }

  const _id = req.params.id;
  try {
    const result = await Tasks.findByIdAndUpdate(_id, req.body, {
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

taskRoute.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await Tasks.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).send();
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = taskRoute;