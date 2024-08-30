const express = require('express');
const { signin, signinPage } = require('../controller/loginController');
require('dotenv').config();

const loginRouter = express.Router();

loginRouter.get("/auth/login", signinPage);

loginRouter.post("/auth/login", signin);

module.exports = loginRouter;