const bcrypt = require("bcryptjs");

module.exports = async function (password) {
  try {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    this.password = await bcrypt.hash(password, salt);
    console.log(this.password);
  } catch (err) {
    console.log(err);
    const error = new Error("There was a problem resetting the password");
    error.code = 403;
    next(error);
  }
};
