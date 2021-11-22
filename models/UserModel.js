const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true },
  emailId: { type: String, required: true },
  profilePicture: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
