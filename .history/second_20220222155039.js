const express = require("express");
const users = require("./routes/users");

const data = express();
data.use(express.json());
data.use('/api/users',users)

const port = process.env.PORT || 3000;
data.listen(port, () => console.log(`listening on port ${port}`));
