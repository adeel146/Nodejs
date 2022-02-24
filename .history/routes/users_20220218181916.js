const express= require('express')
const user = express.Router()


const data = [
    { id: 1, name: "a", genre: "sports" },
    { id: 2, name: "b", genre: "action" },
    { id: 3, name: "c", genre: "sports" },
    { id: 4, name: "d", genre: "comedy" },
  ];
  
  user.get("/", (req, res) => {
    res.send(data);
  });
  
  user.get("/api/users/:genre", (req, res) => {
    const user = data.filter((i) => i.genre == req.params.genre);
    if (user.length == 0) return res.status(404).send("genre not found");
    res.send(user);
  });
  
  user.post("/api/users", (req, res) => {
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
  
  user.put("/api/users/:id", (req, res) => {
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
  
  user.delete("/api/users/:id", (req, res) => {
    const user = data.find((i) => i.id == req.params.id);
    if (!user) return res.status(400).send("user not found");
    const index = data.indexOf(user);
    data.splice(index, 1);
    res.send(user);
  });
  