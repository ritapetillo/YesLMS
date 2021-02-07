const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = require("./User");
const options = { discriminatorKey: "role" };
const savePassword = require("../utils/savePass");

const studentSchema = new schema(
  {
    enrollments: [{ type: String }],
    first_evaluation: {
      type: String,
    },
  },
  options
);

studentSchema.pre("save", savePassword);

const studentModel = User.discriminator("student", studentSchema);
module.exports = studentModel;
