const express = require("express");
const { check, validationResult } = require("express-validator");
const axios = require("axios");

const protect = require("../middleware/protect");
const Profile = require("../models/Profile");
const User = require("../models/User.model");

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(404).json({
        status: "fail",
        message: "There is no profile for this user",
      });
    }
    res.status(201).json({
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.post(
  "/",
  [
    protect,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.status(201).json({
          status: "success",
          profile,
        });
      }

      profile = new Profile(profileFields);

      await profile.save();

      res.status(201).json({
        status: "success",
        profile,
      });
    } catch (error) {
      res.status(401).json({
        status: "fail",
        message: error.message,
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const profile = await Profile.find().populate("user", ["name", "avatar"]);
    res.status(201).json({
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile)
      return res.status(404).json({
        status: "fail",
        message: "There is no profile with this user",
      });

    res.status(201).json({
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.delete("/", protect, async (req, res) => {
  try {
    const profile = await Profile.findOneAndRemove({ user: req.user.id });
    const user = await Profile.findOneAndRemove({ _id: req.user.id });

    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
});

router.put(
  "/experience",
  [
    protect,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } =
      req.body;

    const newExp = { title, company, location, from, to, current, description };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.status(200).json({
        status: "success",
        profile,
      });
    } catch (error) {
      res.status(400).json({ status: "fail", err: error.message });
    }
  }
);

router.delete("/experience/:exp_id", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.status(200).json({
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", err: error.message });
  }
});

router.put(
  "/education",
  [
    protect,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),

      check("from", "From date is required"),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.status(200).json({
        status: "success",
        profile,
      });
    } catch (error) {
      res.status(400).json({ status: "fail", err: error.message });
    }
  }
);

router.delete("/education/:edu_id", protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.status(200).json({
      status: "success",
      profile,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", err: error.message });
  }
});

router.get("/github/:username", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLI_ID}&client_secret=${process.env.GITHUB_CLI_SEC}`,
      { headers: { "user-agent": "node.js" } }
    );
    // console.log(process.env, "env");

    const data = response?.data;
    res.status(201).json({ status: "success", data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail", err: error.message });
  }
});

module.exports = router;
