import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// 1. Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// 2. Callback after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google`,
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Redirect to the success page so frontend can apply the pending role
    res.redirect(`${process.env.CLIENT_URL}/google-success`);
  }
);

export default router;