const User = require("../../../models/User");
const Student = require("../../../models/Student");
const passport = require("passport");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { EMAIL_SECRET } = process.env;

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
