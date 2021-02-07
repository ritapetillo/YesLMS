const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = require("./User");
const options = { discriminatorKey: "role" };
const bcrypt = require("bcryptjs");

const studentSchema = new schema(
  {
    enrollments: [{ type: String }],
    first_evaluation: {
      type: String,
    },
  },
  options
);

studentSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
    next();
  } catch (err) {
    console.log(err);
    const error = new Error("There was a problem saving the user");
    error.code = 403;
    next(error);
  }
});

// studentSchema.methods.comparePass = async function (password, next) {
//   try {
//     const isValid = await bcrypt.compare(this.password, password);
//     if (!isValid) {
//       const error = new Error("Login failed");
//       error.code = 404;
//       return next(error);
//     }
//     return isValid;
//   } catch (err) {
//     const error = new Error("Login failed");
//     error.code = 404;
//     next(error);
//   }
// };

const studentModel = User.discriminator("student", studentSchema);
module.exports = studentModel;
