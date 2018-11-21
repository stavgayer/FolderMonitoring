const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
const keys = require("./config/keys");

mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === "production";
mongoose.connect(keys.mongoURI);
const app = express();

//Configuration
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorHandler());
}
require("./models/Users");
require("./models/Logs")
app.use(require("./routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Basic configurations
//Catching 404 error
app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

//Error handler
app.use(function(err, req, res, next) {
  if (!isProduction) {
    console.log(err);
  }
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: isProduction ? err : {}
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ` + PORT);
});
