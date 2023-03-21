// import { add, Substract } from "./main.mjs";
import multiply, { add } from "./main.mjs";
import all from "node:events"
// const { add, multiply } = require("./module");
// console.log(add(2, 4));
// console.log(multiply(2, 4));

const events= new all()
events.on("test",()=>console.log("listening"))
events.emit("testi")

console.log(multiply(3, 4));
console.log(add(3, 4));
