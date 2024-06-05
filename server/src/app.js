const express = require('express');
const path = require('path');

const loginRouter = require("./routes/loginRouter");
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const questionsRouter = require('./routes/questionsRouter');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieparser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true }));

app.use("/user", express.static(path.join(__dirname, "..", "public")));
app.use("/user", loginRouter);
app.use("/user", registerRouter);

app.use("/home", homeRouter);

mongoose.connect("mongodb://localhost:27017/userData").then((connect) => console.log("Connected"));

app.get("/quiz-session", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "quiz_page.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use("/quiz-session/api", questionsRouter);

app.use('/quiz-session', express.static(path.join(__dirname, "..", 'public')));

app.get("/quiz-session/result", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "result_page.html"));
});

app.get("/logout", (req, res) => {
  res.cookie('access-token', "", { maxAge: 1 });
  res.redirect("/user/login");
});

app.get('/', (req, res) => {
  res.redirect('/user/register');
});

module.exports = app;