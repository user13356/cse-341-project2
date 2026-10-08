const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          googleId: profile.id
        });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : "",
            photo:
              profile.photos && profile.photos.length > 0
                ? profile.photos[0].value
                : ""
          });
        } else {
          // Update user information if Google profile changes.
          user.displayName = profile.displayName;

          if (profile.emails && profile.emails.length > 0) {
            user.email = profile.emails[0].value;
          }

          if (profile.photos && profile.photos.length > 0) {
            user.photo = profile.photos[0].value;
          }

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    }
  )
);

// Store user ID in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Retrieve user from database
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
});

module.exports = passport;
