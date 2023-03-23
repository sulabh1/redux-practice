const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

const router = express.Router();

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
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

    const { name, email, password } = req.body;
    try {
      let alreadyExistUser = await User.findOne({ email });

      if (alreadyExistUser) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }

      const avatar = gravatar.url(email, { s: "200", r: "pg", default: "mm" });
      alreadyExistUser = new User({ name, email, password, avatar });

      const salt = await bcrypt.genSalt(10);

      alreadyExistUser.password = await bcrypt.hash(password, salt);

      const payload = {
        user: {
          id: alreadyExistUser._id,
        },
      };

      await alreadyExistUser.save();

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
