const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if(!token) return res.status(401).json({ message: 'No token provided' });
    console.log("This is token", token);
    console.log("Authorizing the user");

    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(user.userId);
    User.findByPk(user.userId)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    if(error.name==='TokenExpiredError'){
    console.error("Token has expired.")
    return res.status(401).json({ message: "Token expired, please login again" });
    }

    console.log("jwt error", error);
    return res.status(401).json({ message: "Invalid token" })
  }
};

module.exports = { authenticate };
