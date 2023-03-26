const express = require("express");
require("./db/mongodb");
const User = require("./models/userModel");
const Tasks = require("./models/taskModel");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/user", async (req, res) => {
  const newUser = new User(req.body);

  try {
    let result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    let result = await User.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/users/:id", async (req, res) => {
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

app.post("/task", async (req, res) => {
  const newTask = new Tasks(req.body);
  try {
    let result = await newTask.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tasks", async (req, res) => {
  try {
    let result = await Tasks.find({});
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send();
  }
});

app.get("/tasks/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
