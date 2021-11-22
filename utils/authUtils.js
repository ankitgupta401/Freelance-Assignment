const apis = require("./apis");
const { customRequest } = require("./ipcUtils");

exports.isAuthenticated = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let userData = await customRequest({
        url: apis.AUTENTICATOR,
        method: "get",
        header: {
          authorization: req.headers.authorization,
        },
      });
      if (userData.status) {
        req.user = userData.data;
        console.log("forwarded");
        next();
      } else {
        res.json({
          status: false,
          message: userData.message,
        });
      }
    } else {
      res.json({
        status: false,
        message: "unauthorised",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "server error",
    });
  }
};
