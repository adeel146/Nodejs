const Joi = require("joi");
const app = require("express");
const users = require("./routes/users");

const data = app();
data.use(app.json());
users.use('/api')

const port = process.env.PORT || 3000;
data.listen(port, () => console.log(`listening on port ${port}`));
