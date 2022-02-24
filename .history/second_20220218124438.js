const Joi = require("joi");
const app = require("express");
const data = app();
data.use(app.json());

const users = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
];

const findUser = (user) => {
  const user = users.find((i) => i.id == user);
  if (!user) return res.status(400).send("user not found");
};

data.get("/api/users", (req, res) => {
  res.send(users);
});

data.get("/api/users/:id", (req, res) => {
  const user = users.find((i) => i.id == req.params.id);
  if (!user) res.status(404).send("invalid url");
  res.send(user);
});

data.post("/api/users", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.send(user);
});

data.put("/api/users/:id", (req, res) => {
  findUser(req.params.id);
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

data.delete("/api/users/:id", (req, res) => {
    findUser(req.params.id)
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

const port = process.env.PORT || 3000;
data.listen(port, () => console.log(`listening on port ${port}`));
