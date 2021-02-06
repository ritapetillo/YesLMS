const verifyRole = async (req, res, next) => {
  const { role } = req.body;
  if (role !== "student")
    return next(new Error("You are not allowed to enter this section"));
  next();
};

module.exports = { verifyRole };
