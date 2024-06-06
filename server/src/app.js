const express = require('express');
const path = require('path');

const loginRouter = require("./routes/loginRouter");
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const questionsRouter = require('./routes/questionsRouter');
const session = require("express-session");
const mongoose = require('mongoose');
const MongoStore = require("connect-mongo");
const cookieparser = require('cookie-parser');
const { isLogin } = require('./config/auth');
const bodyParser = require('body-parser');
const passport = require("passport");
require("dotenv").config();
require("./config/googleOAuth");

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/userData', // Connection string to the MongoDB database
    collectionName: 'sessions', // optional
    ttl: 60 * 60 // Optional: time to live (TTL) for session data, in seconds (5 mins here)
  }),
  cookie: {
    maxAge: 60 * 60 * 1000
  }
}));


// root routes for user registeration and login
app.use("/user", express.static(path.join(__dirname, "..", "public")));
app.use("/user", loginRouter);
app.use("/user", registerRouter);

// root route for the home page
app.use("/home", isLogin, homeRouter);

// mogoose connection
mongoose.connect("mongodb://localhost:27017/userData").then((connect) => console.log("Connected"));

app.get("/quiz-session", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "quiz_page.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use("/quiz-session/api", questionsRouter); // api route to obtain the quiz questions

app.use('/quiz-session', express.static(path.join(__dirname, "..", 'public')));

app.get("/quiz-session/result", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "result_page.html"));
});

app.get("/logout", (req, res, next) => {
  res.cookie('access-token', "", { maxAge: 1 });
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session during logout.");
    }
    res.clearCookie('connect.sid');
    res.redirect('/user/login');
  })
});

app.get('/', (req, res) => {
  res.redirect('/user/register');
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// google OAuth routes

app.use("/auth", express.static(path.join(__dirname, "..", "public")));
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/google/failure'
}));

app.get("/auth/success", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home_page.html"));
})

module.exports = app;