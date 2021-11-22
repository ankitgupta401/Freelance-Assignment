const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

//register a user with name email id phone number and password and profile picture
exports.createUserUsingEmailPhonePassword = async (req, res, next) => {
  try {
    const { name, emailId, phoneNumber, profilePicture, password } = req.body;

    let salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);
    const doesAlreadyExist = await User.find({
      $or: [{ emailId: emailId }, { phoneNumber: phoneNumber }],
      isDeleted: false,
    });

    if (doesAlreadyExist.length > 0) {
      return res
        .status(200)
        .json({ status: false, data: [], message: "User Already Exists" });
    } else {
      let user = new User({
        name: name,
        emailId: emailId,
        profilePicture: profilePicture,
        phoneNumber: phoneNumber,
        password: pass,
      });

      await user.save();
      res.json({
        status: true,
        message: "user created sucessfully",
        data: user,
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

//update user
exports.updateUserDetailsSelf = async (req, res) => {
  try {
    const { name, emailId, phoneNumber, profilePicture } = req.body;

    const user = await User.findOne({ _id: req.user._id, isDeleted: false });
    if (user) {
      if (name) {
        user.name = name;
      }
      if (emailId) {
        user.emailId = emailId;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (profilePicture) {
        user.profilePicture = profilePicture;
      }
      await user.save();
      res.json({
        status: true,
        data: user,
        message: "User updated",
      });
    } else {
      res.json({
        status: false,
        data: [],
        message: "User Not Found",
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

// get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUser = await User.find({ isDeleted: false });
    res.json({ status: true, data: allUser, message: "Fetched All Users" });
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

//change password
exports.changePassword = async (req, res, next) => {
  try {
    let { oldPassword, newPassword } = req.body;
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
        if (bcrypt.compareSync(oldPassword, user.password)) {
          let salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(newPassword, salt);
          await user.save();
          res.json({
            status: true,
            data: [],
            message: "Password Updated Successfully",
          });
        } else {
          res.json({
            status: false,
            data: [],
            message: "Invalid Old Password",
          });
        }
      } else {
        res.json({
          status: false,
          data: [],
          message: "Invalid Token",
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

//login using phone number or email id and password
exports.loginWithEmailIdPhoneNumberPassword = async (req, res, next) => {
  try {
    let { emailId, phoneNumber, password } = req.body;
    var query = { isDeleted: false };
    if (emailId) {
      query.emailId = emailId;
    } else {
      query.phoneNumber = phoneNumber;
    }

    let user = await User.findOne({ ...query });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

        res.json({
          status: true,
          message: "Login Successful",
          data: {
            token,
            user,
          },
        });
      } else {
        res.json({
          status: false,
          data: [],
          message: "Invalid Credentials",
        });
      }
    } else {
      res.json({
        status: false,
        data: [],
        message: "Invalid Credentials",
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
