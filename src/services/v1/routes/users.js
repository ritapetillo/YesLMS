const express = require("express");
const userRouter = express.Router();
const User = require("../../../models/User");
const UserController = require("../controllers/UserController");
const auth = require("../middlewares/auth");

userRouter.get("/", UserController.getUsers);
userRouter.get(
  "/me",
  auth.authenticate,
  auth.verifyRole,
  UserController.getCurrentUser
);

userRouter.get("/students", UserController.retriveAllStudents);
userRouter.post("/students", UserController.registerStudent);

module.exports = userRouter;
