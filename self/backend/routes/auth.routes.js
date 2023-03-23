const express = require("express");
const { check } = require("express-validator");

const { register, login } = require("../controllers/users.controllers");

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password must be equal or greater than 6 character"
    ).isLength(6),
  ],
  login
);

router.post(
  "/register",
  [
    check("name", "Name should not be empty").not().isEmpty(),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password must be equal or greater than 6 character"
    ).isLength(6),
  ],
  register
);

module.exports = router;
