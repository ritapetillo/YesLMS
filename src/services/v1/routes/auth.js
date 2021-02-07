const express = require("express");
const userRouter = express.Router();
const User = require("../../../models/User");
const AuthController = require("../controllers/AuthController");
const auth = require("../middlewares/auth");

userRouter.post("/login", AuthController.login);

module.exports = userRouter;
