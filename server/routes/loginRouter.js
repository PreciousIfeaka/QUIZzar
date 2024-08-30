const express = require('express');
const { signin, signinPage } = require('../controller/loginController');
require('dotenv').config();

const loginRouter = express.Router();

loginRouter.get("/login", signinPage);

loginRouter.post("/login", signin);

module.exports = loginRouter;