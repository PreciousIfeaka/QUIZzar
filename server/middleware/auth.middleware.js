const jwt = require("jsonwebtoken");;
const log = require("../utils/logger");

const authenticateJWT = async (req, res, next) => {
  const token = await req.cookies.token;
  if (!token) {
    res.sendStatus(401);
  }

  jwt.verify(token, process.env.AUTH_TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };