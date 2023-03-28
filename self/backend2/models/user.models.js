const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "user must have name"],
    },
    email: {
      type: String,
      required: [true, "user must have email"],
    },
    password: {
      type: String,
      required: [true, "password must have password"],
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
