const express = require("express");
const userRoutes = require("./routes/users");
const router = express.Router();
const auth = require("./middlewares/auth");

router.use("/users", userRoutes);

module.exports = router;
