import jwt from "jsonwebtoken";
import User from "../models/users.js";
import asynchandler from "../middlewares/asynchandle.js";

// these both are middle wares if these are true then only the callback functions inside the async get/post methods
// will work
const auth = asynchandler(async (req, res, next) => {
  console.log("HI i am auth");
  let token;
  token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.jwt_secret);
      console.log(decoded);
      req.user = await User.findOne({ username: decoded.username }).select(
        "-password"
      ); //we get the details of user other than the password and store them in an object called req.user
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json("Not authorised,token failed");
    }
  } else {
    res.status(401).json("not authorised,No token found");
  }
});

const authAdmin = asynchandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json("not authorised as an admin");
  }
});

export { authAdmin, auth }; // when multiple exports don't use the default keyword
