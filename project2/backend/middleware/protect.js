const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Not login, Please login to get access" });
  }

  try {
    const accessVerified = await promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );
    console.log(accessVerified);

    req.user = accessVerified.user;
    console.log(">>>>>>>>>>>>");
    next();
  } catch (error) {
    res.status(403).json({
      status: "fail",
      msg: "Invalid login",
    });
  }
};
