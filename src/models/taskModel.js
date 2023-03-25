const mongoose = require("mongoose");

const Tasks = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    require: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

exports.default = Tasks;
