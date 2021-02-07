const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = process.env;

exports.verifyRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== "student")
    return next(new Error("You are not allowed to enter this section"));
  next();
};

exports.authenticate = async (req, res, next) => {
  //I check if the header contains a token
  let token = req.cookies.token;
  //if there is no token, I deny the access
  if (!token) {
    const error = new Error("Access Denied");
    error.code = 401;
    next(error);
  } else {
    try {
      //I grab the info from the toekn and i put them in a request which will be sent to the route handler
      const verifiedUser = await jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verifiedUser;
      next();
    } catch (err) {
      console.log(err);
      const error = new Error("Invalid Token");
      error.code = 400;
      next(error);
    }
  }
};

//TOKEN HANDLING
exports.generateToken = async (user, res) => {
  const accessToken = await jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    TOKEN_SECRET
    // {
    //   expiresIn: "100",
    // }
  );
  console.log(user);

  res.cookie("token", accessToken, {
    secure: false, // set to true if your using https
    httpOnly: true,
  });
  return { accessToken };
};
