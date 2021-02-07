const mongoose = require("mongoose");
const schema = mongoose.Schema;
const User = require("./User");
const options = { discriminatorKey: "role" };
const savePassword = require("../utils/savePass");

const adminSchema = new schema(
  {
    admin_role: {
      type: String,
    },
  },
  options
);

adminSchema.pre("save", savePassword);

const adminModel = User.discriminator("admin", adminSchema);
module.exports = adminModel;
