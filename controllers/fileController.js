exports.uploadFile = async (req, res, next) => {
  try {
    // console.log(req);
    if (req.file) {
      var port = req.app.settings.port || cfg.port;
      res.json({
        status: true,
        message: "file has been uploaded.",
        file:
          req.protocol +
          "://" +
          req.hostname +
          (port == 80 || port == 443 ? "" : ":" + port) +
          "/" +
          req.file.path,
      });
    } else {
      res.json({
        status: false,
        message: "no file given.",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      message: "server error!",
    });
  }
};
