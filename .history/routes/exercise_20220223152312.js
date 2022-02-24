const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://adeel146:Adeel.786@cluster0.ibbsz.mongodb.net/sample_supplies?retryWrites=true&w=majority"
);

const SalesSchema= new mongoose.Schema({

items
:
Array
storeLocation
:
"Denver"
customer
:
Object
couponUsed
:
false
purchaseMethod
:
"In store"
})