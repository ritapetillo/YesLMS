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
userRouter.delete("/", async (req, res, next) => {
  const deleted = await User.deleteMany();
  res.send("deleted");
});

//ADMIN ROUTES
userRouter.post("/admin", UserController.registerAdmin);

module.exports = userRouter;
