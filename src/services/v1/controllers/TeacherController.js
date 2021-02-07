const Teacher = require("../../../models/Teacher");
const { authenticate, generateTokenEmail } = require("../middlewares/auth");
const { confirmEmail } = require("../../../utils/email");

//STUDENTS
exports.registerTeacher = async (req, res, next) => {
  try {
    const newTeacher = await new Teacher(req.body);
    const teacher = await newTeacher.save();
    const emailToken = await generateTokenEmail(teacher);
    const url = `${process.env.API_URI}/api/v1/auth/confirm/${emailToken}`;
    const email = await confirmEmail(teacher, url);
    res.status(201).send({ teacher });
  } catch (err) {
    const error = new Error("It was not possible to create a new student");
    error.code = 404;
    next(error);
  }
};

exports.retriveAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find();
    res.status(201).send({ teachers });
  } catch (err) {
    const error = new Error("It was not possible to find any students");
    error.code = 404;
    next(error);
  }
};
