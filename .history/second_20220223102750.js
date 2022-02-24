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
  address: String,
  validated: Boolean,
});

const Users = mongoose.model("users", kittySchema);
async function createuser() {
  const usersMongoo = new Users({
    name: "Silence",
    address: "lahore",
    validated: true,
  });
  const result= await usersMongoo.save()
}
createuser()

const findCourse =async ()=>{
    const result = await Users.find
}
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
