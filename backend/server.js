"use strict";
var fs = require("fs");
var path = require("path");
const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";

var config = require(__dirname + "/config/config.json")[env];

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
fs.readdirSync(__dirname).filter(function (file) {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
});

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));
  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.use(express.json());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 48,
    },
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  user: process.env.MYSQL_USER,
  host: process.env.MYSQL_HOST,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Hurray!:) You've started the amtil_cms server!");
  }
});

require("./routes/authentication-routes")(app, db);
require("./routes/encyclopedia-objects")(app, db);
require("./routes/course-routes")(app, db);
require("./routes/chapter-routes")(app, db);
require("./routes/lesson-routes")(app, db);
require("./routes/section-routes")(app, db);
require("./routes/aws-routes")(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Running Server on " + PORT);
  console.log("Environment: " + env);
});
