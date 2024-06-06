const passport = require("passport");
require("dotenv").config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID:     process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback",
    passReqToCallback   : true
  },

  (request, accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
})