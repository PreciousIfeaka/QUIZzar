const express = require('express');
const path = require('path');

const loginRouter = require("./routes/loginRouter");
const registerRouter = require('./routes/registerRouter');
const homeRouter = require('./routes/homeRouter');
const questionsRouter = require('./routes/questionsRouter');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/home", homeRouter);

app.get("/questions", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "quiz_page.html"), (err) => {
    if (err) {
      next(err);
    }
  });
});

app.use("/questions/api", questionsRouter);

app.use('/questions', express.static(path.join(__dirname, "..", 'public')));

app.get("/questions/result", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "result_page.html"));
});

app.get('/', (req, res) => {
  res.redirect('/register');
});

module.exports = app;