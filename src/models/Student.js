const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = require("./User");
const options = { discriminatorKey: "role" };

const studentSchema = new schema(
  {
    enrollments: [{ type: String }],
    first_evaluation: {
      type: String,
    },
  },
  options
);

const studentModel = User.discriminator("student", studentSchema);
module.exports = studentModel;
