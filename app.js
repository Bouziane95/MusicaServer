require("dotenv").config();
require("./config/dbConnection");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/Users");
var bandsRouter = require("./routes/Bands");

/**
 * Middlewares
 */
const corsOptions = { origin: process.env.FRONTEND_URL, credentials: true };
app.use(cors(corsOptions));
app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Persist session in database.
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);


// app.use(async function(req,res,next) {
//   const User = require("./models/User")
//   const user =  await User.findOne();
//   req.session.currentUser = user._id;
// app.use(async function(req,res,next) {
//   const User = require("./models/User")
//   const user =  await User.findOne();
//   // console.log(user)
//   // req.session.currentUser = user._id;
//   next();
// })

// Test to see if user is logged In before getting into any router.
app.use(function (req, res, next) {
  next();
});

/**
 * Routes
 */

const authRouter = require("./routes/auth");

app.use("/api/auth", authRouter);
// app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/bands", bandsRouter);

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
  });
}

// 404 Middleware
app.use((req, res, next) => {
  const error = new Error("Ressource not found.");
  error.status = 404;
  next(err);
});

// Error handler middleware
// If you pass an argument to your next function in any of your routes or middlewares
// You will end up in this middleware
// next("toto") makes you end up here
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }
  console.log("An error occured");
  res.status(err.status || 500);
  if (!res.headersSent) {
    res.json(err);
  }
});

module.exports = app;