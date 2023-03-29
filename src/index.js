const express = require("express");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/tasks");
require("./db/mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoute);
app.use(taskRoute);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

