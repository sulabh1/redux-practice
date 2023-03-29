const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
