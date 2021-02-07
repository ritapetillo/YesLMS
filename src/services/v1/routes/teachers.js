const express = require("express");
const teacherRouter = express.Router();
const TeacherController = require("../controllers/TeacherController");

teacherRouter.get("/", TeacherController.retriveAllTeachers);
teacherRouter.post("/register", TeacherController.registerTeacher);

module.exports = teacherRouter;
