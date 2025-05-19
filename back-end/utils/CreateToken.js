import jwt from "jsonwebtoken";

const generateToken = (res, username) => {
  const token = jwt.sign({ username }, process.env.jwt_secret, {
    // we used username here so we will get username in the decoded object
    expiresIn: "10d",
  });

  // set jwt as http only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.Node_ENV != "development",
    sameSite: "Strict",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateToken;
