const express = require("express");
const passport = require("passport");

const router = express.Router();

/*
 * Start Google OAuth login.
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email"
    ]
  })
);

/*
 * Google OAuth callback.
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login-failed"
  }),
  (req, res) => {
    res.redirect("/api-docs");
  }
);

/*
 * Check current logged-in user.
 */
router.get("/me", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated."
    });
  }

  return res.status(200).json({
    success: true,
    message: "You are authenticated.",
    user: req.user
  });
});

/*
 * Logout.
 */
router.get("/logout", (req, res, next) => {
  req.logout((logoutError) => {
    if (logoutError) {
      return next(logoutError);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return next(sessionError);
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: true,
        message: "Successfully logged out."
      });
    });
  });
});

/*
 * OAuth failure.
 */
router.get("/login-failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google authentication failed."
  });
});

module.exports = router;
