const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");

//authenticate the Token
exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    if (token) {
      let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      let user = await User.findOne({
        _id: decoded._id,
        isDeleted: false,
      });
      if (user) {
        res.json({
          status: true,
          message: "user decoded",
          data: user,
        });
      } else {
        res.json({
          status: false,
          data: [],
          message: "Invalid Token Make Sure Your Account Is Verified",
        });
      }
    } else {
      res.json({
        status: false,
        data: [],
        message: "Invalid Token",
      });
    }
  } catch (err) {
    console.log(err);
    let errorMessage = "server error";
    if (err.errors) {
      errorMessage =
        err.errors.length > 0 ? err.errors[0].message : "server error";
    }
    res.json({
      status: false,
      data: [],
      message: errorMessage,
    });
  }
};
