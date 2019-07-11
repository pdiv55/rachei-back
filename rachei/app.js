const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const groupsRouter = require("./routes/groups");
const expensesRouter = require("./routes/expenses");

const app = express();

require("dotenv").config();

app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
​
app.use(session({
 secret: "key1",
 resave: true,
 saveUninitialized: true,
 cookie: { maxAge: 600000 },
 rolling: true,
 store: new MongoStore({
  mongooseConnection: mongoose.connection,
  ttl: 24 * 60 * 60
 })
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/groups", groupsRouter);
app.use("/expenses", expensesRouter);

require("./config/auth")(passport);

app.use(passport.initialize());
app.use(passport.session());

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, error => {
  if (error) {
    console.log("Não consegui conectar");
  } else {
    console.log("CONECTAMOS");
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
