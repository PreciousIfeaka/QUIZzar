const jwt = require("jsonwebtoken");
const log = require("../utils/logger");

const authenticateJWT = async (req, res, next) => {
  const token = await req.cookies.token;
  const googleToken = await req.user.emailToken;
  
  if (googleToken) {
    req.user = req.user;
    next();
  } else if (token) {
    jwt.verify(token, process.env.AUTH_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJWT };