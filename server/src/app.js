const express = require('express');
const path = require('path');

const loginRouter = require("./routes/loginRouter");
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const questionsRouter = require('./routes/questionsRouter');
const session = require("express-session");
const mongoose = require('mongoose');
const MongoDBSession = require('connect-mongodb-session')(session);
// const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require("passport");
require("dotenv").config();
require("./config/googleOAuth");

const app = express();


app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true }));
// app.use(cookieparser());

// mogoose connection
mongoose.connect("mongodb://localhost:27017/userData").then((connect) => console.log("Connected"));

const store = new MongoDBSession({
  uri: "mongodb://localhost:27017/userData",
  collection: "sessions",
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// root routes for user registeration and login
app.use("/user", express.static(path.join(__dirname, "..", "public")));
app.use("/user", loginRouter);
app.use("/user", registerRouter);

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

// google OAuth routes
app.use("/auth", express.static(path.join(__dirname, "..", "public")));

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

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to destroy session during logout.");
    }
    res.redirect('/user/login');
  })
});

// root route for the home page
app.use("/home", homeRouter);


app.get('/', (req, res) => {
  res.redirect('/user/register');
  req.session.isAuth = true;
});

module.exports = app;