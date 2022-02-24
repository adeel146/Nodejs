const app = require("express");
const users = require("./routes/users");
require('display')
const data = app();
data.use(app.json());
data.use('/api/users',users)

const port = process.env.PORT || 3000;
data.listen(port, () => console.log(`listening on port ${port}`));
