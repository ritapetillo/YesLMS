const mongoose = require("mongoose");
const userRouter = require("../services/v1/routes/users");
const schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const options = { discriminatorKey: "role" };

const userSchema = new schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  options
);

userSchema.methods.comparePass = async function (password, next) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  } catch (err) {
    const error = new Error("Login failed");
    error.code = 404;
    throw error;
  }
};

module.exports = mongoose.model("users", userSchema);
