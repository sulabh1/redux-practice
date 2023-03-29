const express = require("express");
const { check } = require("express-validator");

const {
  createTask,
  listTask,
  listSingleTask,
  updateTask,
} = require("../controllers/task.controllers");

const router = express.Router();

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  createTask
);

router.get("/", listTask);
router.get("/:id", listSingleTask);
router.put("/:id", updateTask);

module.exports = router;
