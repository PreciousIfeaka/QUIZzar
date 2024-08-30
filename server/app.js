const express = require('express');
const path = require('path');

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
const { authenticateJWT } = require('./middleware/auth.middleware');
require("dotenv").config();
require("./config/googleOAuth");

const app = express();


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


app.use("/", express.static(path.join(__dirname, "..", "client")));
app.use("/", loginRouter);
app.use("/", registerRouter);

app.get('/', (req, res) => {
  res.redirect("/auth/register");
});

app.get("/quiz-session", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "client", "quiz_page.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use("/quiz-session/api", authenticateJWT, questionsRouter); // api route to obtain the quiz questions

app.use('/quiz-session', authenticateJWT, express.static(path.join(__dirname, "..", "client")));

app.get("/quiz-session/result", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "result_page.html"));
});

app.use("/auth", express.static(path.join(__dirname, "..", "client")));

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
  res.send(`<p> Something went wrong. Go back to <a href="/user/login">login page</a>`);
})

app.use("/", homeRouter);

app.get("/logout", (req, res) => {
  res.clearCookie('token');
  res.redirect("/auth/login");
});

module.exports = app;