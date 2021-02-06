const mongoose = require("mongoose");
const schema = mongoose.Schema;

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

module.exports = mongoose.model("users", userSchema);
