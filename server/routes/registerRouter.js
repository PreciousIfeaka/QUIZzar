const express = require("express");
const { registerPage, httpRegister, smtpVerifyEmail } = require("../controller/register.controller");


const registerRouter = express.Router();

registerRouter.get("/auth/register", registerPage)

registerRouter.post("/auth/register", httpRegister);

registerRouter.get("/auth/verify-email", smtpVerifyEmail);

module.exports = registerRouter;