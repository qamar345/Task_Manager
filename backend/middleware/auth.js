require("dotenv").config();
const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.SECRETKEY);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = Auth;
