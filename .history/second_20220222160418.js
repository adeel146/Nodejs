const express = require("express");
const app = express();
const users = require("./routes/users");
const mongoose = require('mongoose')

app.use(express.json());
app.use('/api/users',users)
mongoose.connect()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
