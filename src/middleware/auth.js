const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.status(401).send("UnAuthorized");
    }
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "mysecretkey");
    const user = await User.findOne({ _id: decode._id, "tokens.token": token });
    if (!user) {
      return res.status(403).send("Invalid Token");
    }
    req.token = token;
    req.user = user;
  } catch (error) {
    res.status(400).send(error.message);
  }
  next();
};

module.exports = verifyToken;
