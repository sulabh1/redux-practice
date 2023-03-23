const express = require("express");
const {
  createTask,
  getTask,
  getSingleTask,
} = require("../controllers/task.controller");

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTask);
router.get("/tasks/:id", getSingleTask);

module.exports = router;
