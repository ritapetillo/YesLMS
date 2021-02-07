const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, PASS_RECOVERY_SECRET } = process.env;

exports.generateTokenPasswordReset = async (user, res) => {
  const { id } = user;
  console.log(id);
  const token = await jwt.sign({ id }, PASS_RECOVERY_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
