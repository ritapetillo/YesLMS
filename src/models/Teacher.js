const mongoose = require("mongoose");
const schema = mongoose.Schema;
const options = { discriminatorKey: "role" };
const savePassword = require("../utils/savePass");
const User = require("./User");

const teacherSchema = new schema(
  {
    courses: [{ type: String }],
  },
  options
);

teacherSchema.pre("save", savePassword);

const teacherModel = User.discriminator("teacher", teacherSchema);
module.exports = teacherModel;
