const express = require("express");
const studentRouter = express.Router();
const StudentController = require("../controllers/StudentController");

studentRouter.get("/", StudentController.retriveAllStudents);
studentRouter.post("/register", StudentController.registerStudent);

module.exports = studentRouter;
