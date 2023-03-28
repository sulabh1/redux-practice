const express = require("express");
const { check } = require("express-validator");

const {
  createTask,
  listTask,
  listSingleTask,
} = require("../controllers/task.controllers");

const router = express.Router();

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  createTask
);

router.get("/", listTask);
router.get("/:id", listSingleTask);

module.exports = router;
