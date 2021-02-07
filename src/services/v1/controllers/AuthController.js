const User = require("../../../models/User");
const Student = require("../../../models/Student");
const passport = require("passport");
const auth = require("../middlewares/auth");

exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error();
    console.log(user);
    const isValid = await user.comparePass(password, next);
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
