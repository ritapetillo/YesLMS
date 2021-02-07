const express = require("express");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const router = express.Router();
const auth = require("./middlewares/auth");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
