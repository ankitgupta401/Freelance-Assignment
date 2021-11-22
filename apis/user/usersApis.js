const express = require("express");
const { body, oneOf } = require("express-validator");
const {
  getAllUsers,
  createUserUsingEmailPhonePassword,
  changePassword,
  loginWithEmailIdPhoneNumberPassword,
  updateUserDetailsSelf,
} = require("../../controllers/user/authControllers");
const { isAuthenticated } = require("../../utils/authUtils");
const router = express.Router();
const { errorHandler } = require("../../utils/errorUtils");

// Get All Users
router.get("/get_users", isAuthenticated, getAllUsers);

router.post(
  "/login",
  [
    oneOf([
      body("phoneNumber").not().isEmpty().withMessage("invalid phoneNumber."),
      body("emailId").isEmail().withMessage("invalid email."),
    ]),
    body("password").not().isEmpty().withMessage("invalid password."),
  ],
  errorHandler,
  loginWithEmailIdPhoneNumberPassword
);

// Create user
router.post(
  "/create_user",
  [
    body("phoneNumber").not().isEmpty().withMessage("invalid phoneNumber."),
    body("emailId").isEmail().withMessage("invalid email."),
    body("name").not().isEmpty().withMessage("invalid name."),
    body("password").not().isEmpty().withMessage("invalid password."),
    body("profilePicture")
      .not()
      .isEmpty()
      .withMessage("invalid profile picture."),
  ],
  errorHandler,
  createUserUsingEmailPhonePassword
);

// Update user
router.post(
  "/update_user",
  [
    oneOf([
      body("phoneNumber").not().isEmpty().withMessage("invalid phoneNumber."),
      body("emailId").isEmail().withMessage("invalid email."),
      body("name").not().isEmpty().withMessage("invalid name."),
      body("profilePicture")
        .not()
        .isEmpty()
        .withMessage("invalid profile picture."),
    ]),
  ],
  isAuthenticated,
  errorHandler,
  updateUserDetailsSelf
);

// Update user
router.post(
  "/update_password",
  [
    body("oldPassword").not().isEmpty().withMessage("invalid old password."),
    body("newPassword").not().isEmpty().withMessage("invalid new password."),
  ],
  isAuthenticated,
  errorHandler,
  changePassword
);

module.exports = router;
