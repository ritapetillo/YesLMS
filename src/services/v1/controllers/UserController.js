const User = require("../../../models/User");
const Admin = require("../../../models/Admin");
const { authenticate, generateTokenEmail } = require("../middlewares/auth");
const { confirmEmail } = require("../../../utils/email");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).send({ users });
  } catch (err) {
    const error = new Error("No users found");
    error.code = 401;
    next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(201).send({ user });
  } catch (err) {
    const error = new Error("No users found");
    error.code = 401;
    next(error);
  }
};

//ADMIN

exports.registerAdmin = async (req, res, next) => {
  try {
    const newAdmin = await new Admin(req.body);
    const admin = await newAdmin.save();
    const emailToken = await generateTokenEmail(admin);
    const url = `${process.env.API_URI}/api/v1/auth/confirm/${emailToken}`;
    const email = await confirmEmail(teacher, url);
    res.status(201).send({ teacher });
  } catch (err) {
    const error = new Error("It was not possible to create a new student");
    error.code = 404;
    next(error);
  }
};
