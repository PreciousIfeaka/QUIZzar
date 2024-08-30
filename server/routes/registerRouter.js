const express = require("express");
const { registerPage, httpRegister, smtpVerifyEmail } = require("../controller/register.controller");


const registerRouter = express.Router();

registerRouter.get("/register", registerPage)

registerRouter.post("/register", httpRegister);

registerRouter.get("/verify-email", smtpVerifyEmail);

module.exports = registerRouter;