const express = require("express");
const app = express();
const users = require("./routes/users");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/api/users", users);
mongoose.connect(
  "mongodb+srv://adeel146:Adeel@cluster0.ibbsz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
