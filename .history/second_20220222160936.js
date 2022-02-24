const express = require("express");
const app = express();
const users = require("./routes/users");
const mongoose = require("mongoose");

app.use(express.json());
app.use("/api/users", users);
mongoose
  .connect(
    "mongodb+srv://adeel146:Adeel.786@cluster0.ibbsz.mongodb.net/nodejs?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  });

  const schema=moong

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
