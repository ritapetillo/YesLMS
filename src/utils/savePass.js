const bcrypt = require("bcryptjs");

module.exports = async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
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
};
