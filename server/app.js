const express = require('express');
const path = require("path");
const cors = require("cors");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const questionsRouter = require('./routes/questionsRouter');
const session = require("express-session");
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const passport = require("passport");
const log = require("./utils/logger");
const { routeNotFound } = require('./middleware/error');
require("dotenv").config();
require("./config/googleOAuth");

const app = express();
app.options("*", cors());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "client")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true }));

mongoose.connect(
  process.env.MONGO_CONNECT_STRING
).then(
  () => log.info("db connected successfully")
).catch(
  (error) => log.error(error.message)
);

const store = new MongoDBSession({
  uri: process.env.MONGO_CONNECT_STRING,
  collection: "quizzar-collection",
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth", express.static(path.join(__dirname, "..", "client")));
app.use("/auth", loginRouter);
app.use("/auth", registerRouter);

app.get("/", (req, res) => {
  res.redirect("/auth/register");
});

app.use("/quiz-session", express.static(path.join(__dirname, "..", "client")));

app.use("/quiz-session", questionsRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
  })
);

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
      successRedirect: '/auth/success',
      failureRedirect: '/auth/google/failure'
    })
);

app.get("/auth/success", (req, res) => {
  res.redirect("/home");
});

app.get("/auth/google/failure", (req, res) => {
  res.send(`<p> Something went wrong. Go back to <a href="/auth/login">login page</a>`);
})

app.use("/", homeRouter);

app.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.redirect("/auth/login");
});

app.use(routeNotFound);

module.exports = app;