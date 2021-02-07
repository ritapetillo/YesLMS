const User = require("../../../models/User");
const Student = require("../../../models/Student");

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

exports.registerStudent = async (req, res, next) => {
  try {
    const newStudent = await new Student(req.body);
    const student = await newStudent.save();
    res.status(201).send({ student });
  } catch (err) {
    console.log(err);
    const error = new Error("It was not possible to create a new student");
    error.code = 404;
    next(error);
  }
};

exports.retriveAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(201).send({ students });
  } catch (err) {
    console.log(err);
    const error = new Error("It was not possible to find any students");
    error.code = 404;
    next(error);
  }
};
