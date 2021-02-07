const User = require("../../../models/User");
const Student = require("../../../models/Student");
const passport = require("passport");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { generateTokenPasswordReset } = require("../../../utils/tokens");
const { sendResetPasswordEmail } = require("../../../utils/email");
const { EMAIL_SECRET, PASS_RECOVERY_SECRET } = process.env;

//POST /auth/login
//user login
exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error();
    else if (!user.verified) return next(new Error("User not verified"));
    const isValid = await user.comparePass(password, next);
    console.log(isValid);
    if (!isValid) throw Error();
    const token = await auth.generateToken(user, res);
    res.status(201).send({ token });
  } catch (err) {
    console.log(err);
    const error = new Error("Wrong email or password");
    error.code = 404;
    next(error);
  }
};

//GET /auth/confirm
//confirm email after registration
exports.confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  if (!token) {
    const error = new Error("Access Denied");
    error.code = 401;
    next(error);
  } else {
    try {
      //I grab the info from the toekn and i put them in a request which will be sent to the route handler
      const verifiedUser = await jwt.verify(token, EMAIL_SECRET);
      const { id } = verifiedUser;
      const user = await User.findById(id);
      if (user.verified) throw Error;
      await user.verify();
      res.send("verified");
    } catch (err) {
      console.log(err);
      const error = new Error("Invalid Token");
      error.code = 400;
      next(error);
    }
  }
};

//POST /auth/reset-password/:token
//confirm email after registration
exports.resetPassword = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  if (!token) {
    const error = new Error("Access Denied");
    error.code = 401;
    next(error);
  } else {
    try {
      //I grab the info from the toekn and i put them in a request which will be sent to the route handler
      const verifiedUser = await jwt.verify(token, PASS_RECOVERY_SECRET);
      const { id } = verifiedUser;
      const user = await User.findById(id);
      if (user.verified) throw Error;
      user.editPassword(req.body.password);
      user.save();
      res.send({ user });
    } catch (err) {
      console.log(err);
      const error = new Error("Invalid Token");
      error.code = 400;
      next(error);
    }
  }
};

//POST /auth/forgot-password
//confirm email after registration
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error();
    const emailToken = await generateTokenPasswordReset(user);
    const url = `${process.env.API_URI}/api/v1/auth/confirm/${emailToken}`;
    const emailSent = await sendResetPasswordEmail(user, url);
    res.status(201).send({ emailSent });
  } catch (err) {
    const error = new Error("No user find with this email");
    error.code = 404;
    next(error);
  }
};
