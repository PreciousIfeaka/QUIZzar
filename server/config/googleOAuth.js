const passport = require("passport");
const User = require("../models/userModel");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID:     process.env.OAUTH_CLIENT_ID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.GOOGLE_OAUTH_URL}/auth/google/callback`,
    passReqToCallback   : true
  },
  
  async (request, accessToken, refreshToken, profile, done) => {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = new User({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        emailToken: accessToken
      });
      await user.save();
    }
    done(null, user);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async(user, done) => {
  done(null, user);
});