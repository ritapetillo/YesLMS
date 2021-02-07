const express = require("express");
const userRoutes = require("./routes/users");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const authRoutes = require("./routes/auth");
const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/teachers", teacherRoutes);

module.exports = router;
