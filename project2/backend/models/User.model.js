const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have their name"],
  },
  email: {
    type: String,
    required: [true, "User must have their email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have password"],
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
