const Student = require("../../../models/Student");
const { authenticate, generateTokenEmail } = require("../middlewares/auth");
const { confirmEmail } = require("../middlewares/email");

//STUDENTS
exports.registerStudent = async (req, res, next) => {
  try {
    const newStudent = await new Student(req.body);
    const student = await newStudent.save();
    const emailToken = await generateTokenEmail(student);
    const url = `${process.env.API_URI}/api/v1/auth/confirm/${emailToken}`;
    const email = await confirmEmail(student, url);
    res.status(201).send({ student });
  } catch (err) {
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
    const error = new Error("It was not possible to find any students");
    error.code = 404;
    next(error);
  }
};
