const express = require("express");
const app = express();
const users = require("./routes/users");
const mongoose = require("mongoose");
const { string, boolean } = require("joi");

app.use(express.json());
app.use("/api/users", users);
mongoose
  .connect(
    "mongodb+srv://adeel146:Adeel.786@cluster0.ibbsz.mongodb.net/nodejs?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to database");
  });

const kittySchema = new mongoose.Schema({
  name: String,
  address: string,
  validated: boolean,
});

const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence',address:"lahore", });
console.log(silence.name)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
