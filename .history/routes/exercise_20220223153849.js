const { date, boolean } = require("joi");
const mongoose = require("mongoose");
const { object } = require("underscore");

mongoose
  .connect(
    "mongodb+srv://adeel146:Adeel.786@cluster0.ibbsz.mongodb.net/sample_supplies?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected with database"));

const salesSchema = new mongoose.Schema({
  saleDate: date(),
  items: [],
  storeLocation: String,
  customer: {},
  couponUsed: boolean,
  purchaseMethod: String,
});

const Sales= mongoose.model('sales',salesSchema)

const fetchdata = async()=>{
    const result = await Sales
}



