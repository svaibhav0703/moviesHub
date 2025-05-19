import User from "../models/users.js";
import bcrypt from "bcryptjs";
import asynchandler from "../middlewares/asynchandle.js";
import generateToken from "../utils/CreateToken.js";

const createUser = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  // not creating the user
  if (!username || !email || !password) throw new Error("fill all the fields");

  const userExists = await User.findOne({ email });

  if (userExists) res.status(400).send("user exists already ");

  // hashing the user password
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(password, salt); // hashing the password using the salt

  const newUser = new User({ username, email, password: hashedpass }); // User is the model and newUser is the instance of that model with the following data

  try {
    await newUser.save(); // .save method is used to save instances of the model not the model itself
    const token = generateToken(res, newUser.username); // generated new token because the details of the user changed so they must reflect everywhere in the website
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: token, // token is sent to frontend
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const validPass = bcrypt.compare(password, existingUser.password);
    if (validPass) {
      const token = generateToken(res, existingUser.username);
      const cleanUser = existingUser.toObject();
      res.status(201).json({ ...cleanUser, token: token });
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } else {
    res.status(401).json({ message: "user not found" });
  }
});

const logoutUser = asynchandler(async (req, res) => {
  res.cookie("jwt", "", {
    // the cookie is replaced with an empty cookie
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ message: "logged out successfully" });
});

const getallUsers = asynchandler(async (req, res) => {
  const users = await User.find({}); // when user go on this route and uses fetch api by GET method then he gets the detail of all users
  res.json(users);
});

const getCurrentUser = asynchandler(async (req, res) => {
  const currentUser = await User.findOne({ _id: req.user._id });
  if (currentUser) {
    res.status(201).json(currentUser);
  } else {
    res.status(401).json({ message: "user not found" });
  }
});

const updateUser = asynchandler(async (req, res) => {
  const { username, password, email } = req.body; // new username and password sent by post method by a form in the frrontend
  const currUser = await User.findOne({ _id: req.user._id }); // getting currUser from the database

  if (currUser) {
    // if the user is logged in then req.user will contain info about the user
    currUser.username = username || currUser.username;
    currUser.email = email || currUser.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const newhashedpass = await bcrypt.hash(password, salt);
      currUser.password = newhashedpass;
    }
    const updatedUser = await currUser.save(); // saving the new user to the database
    const newtoken = generateToken(res, updatedUser.username);
    const cleanUpdatedUser = updatedUser.toObject();
    res.status(201).json({ ...cleanUpdatedUser, token: newtoken }); // sends the updated User and the token to fronten
  } else {
    res.status(404).json({ message: "user not found" });
  }
});

export {
  createUser,
  getallUsers,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUser,
};
