const Joi = require("joi");
const app = require("express");
const data = app();
data.use(app.json());
const users = require("./routes/users");
const port = process.env.PORT || 3000;
data.listen(port, () => console.log(`listening on port ${port}`));
