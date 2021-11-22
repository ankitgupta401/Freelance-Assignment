require("dotenv").config();

const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const logger = require("morgan");
const path = require("path");
require("./utils/connection");

const testApis = require("./apis/testApis");
const isAuthenticated = require("./apis/user/isAuthenticatedApis");
const userApis = require("./apis/user/usersApis");
const uploadImage = require("./apis/user/uploadImage");

//app creation and middlewares
const app = express();
app.use(helmet());
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: function (res, path, stat) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.use("/api/v1/user", testApis);
app.use("/api/v1/user", isAuthenticated);
app.use("/api/v1/user", userApis);
app.use("/api/v1/user", uploadImage);

app.use(function (err, req, res, next) {
  if (err) {
    res.json({
      status: false,
      data: [],
      message: err.message,
    });
  } else {
    res.json({
      status: false,
      data: [],
      message: "Invalid Api.",
    });
  }
});

module.exports = app;
