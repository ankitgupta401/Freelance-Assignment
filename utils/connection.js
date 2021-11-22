const mongoose = require("mongoose");

const uri = `mongodb+srv://${
  process.env.DEV_DATABASE_USER
}:${encodeURIComponent(process.env.DEV_DATABASE_PASS)}@${
  process.env.DEV_DATABSE_SERVER
}/${process.env.DEV_DATABSE_NAME}?authSource=admin?retryWrites=true&w=majority`;

console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

module.exports = mongoose;

global.mongoose = mongoose;
