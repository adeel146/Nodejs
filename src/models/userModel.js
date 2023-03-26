const mongoose = require("mongoose");
const { isEmail } = require("validator");

const User = mongoose.model("users", {
  name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail, "Invalid Email"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Cannot set property Password");
      }
    },
  },
});

module.exports = User;
