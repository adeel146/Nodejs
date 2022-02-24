const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://adeel146:Adeel.786@cluster0.ibbsz.mongodb.net/sample_supplies?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected with database"));

const salesSchema = new mongoose.Schema({
  saleDate: Date,
  items: [],
  storeLocation: String,
  customer: {},
  couponUsed: Boolean,
  purchaseMethod: String,
});

const Sales = mongoose.model("sales", salesSchema);

const fetchdata = async () => {
  const result = await Sales.find({
    purchaseMethod: "Online",
    "customer.age": 50,
  });
  console.log("result", result);
};
// fetchdata();

const deletedata =async(id)=>{
  const result= await Sales.findByIdAndRemove(id)
}

deletedata(5bd761dcae323e45a93ccfe8)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
