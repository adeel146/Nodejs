const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
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
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//define virtual connection to tasks

userSchema.virtual("mytasks", {
  ref: "Task",
  localField: "_id", //reference from this schema  field
  foreignField: "owner", //reference to the Taks Schema field
});

//define function that ca be accessed by User Model

userSchema.statics.findUserByCredentials = async function (email, password) {
  let user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }
  // const isValid = await bcrypt.compare(password, user.password);
  const isValid = password === user.password;

  if (!isValid) {
    throw new Error("Invalid Password");
  }
  return user;
};

//run middleware before saving the data

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "mysecretkey");
  return token;
};

userSchema.methods.toJSON = function () {
  let user = this;
  let newUser = user.toObject();
  delete newUser.tokens;
  delete newUser.password;
  return newUser;
};

const User = mongoose.model("users", userSchema);

module.exports = User;
