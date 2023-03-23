const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const protect = require("../middleware/protect");
const User = require("../models/User.model");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(201).json({
      status: "success",
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      msg: error.message,
    });
  }
});

router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check(
      "password",
      "Password must be greater that or equal to 6 character"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        err: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let alreadyExistUser = await User.findOne({ email });

      if (!alreadyExistUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const passwordVerification = await bcrypt.compare(
        password,
        alreadyExistUser.password
      );

      if (!passwordVerification) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const payload = {
        user: {
          id: alreadyExistUser._id,
        },
      };

      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP_IN,
        algorithm: "HS256",
      });

      res.status(201).json({
        status: "success",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "fail",
        err: error.message,
      });
    }
  }
);

module.exports = router;
