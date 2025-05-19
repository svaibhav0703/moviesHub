import express from "express";
import { authAdmin, auth } from "./middlewares/auth.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getallUsers,
  getCurrentUser,
  updateUser,
} from "./controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", auth, authAdmin, getallUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);
router.route("/profile").get(auth, getCurrentUser).put(auth, updateUser);
// .get to display user details on the frontend
export default router;
