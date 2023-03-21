const fs = require("fs");

// create json file
// it always accept file name and data in string form

// const bookInfo = {
//   name: "Physics",
//   passingMarks: "50%",
//   totalMarks: 100,
// };
// const stringJson = JSON.stringify(bookInfo);
// console.log(stringJson);

// fs.writeFileSync("Physics.json", stringJson);

//read data from a file
const fileData = fs.readFileSync("Physics.json");
console.log(JSON.parse(fileData.toString()));
