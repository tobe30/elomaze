import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

const setupPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails[0].value.toLowerCase();

          // Find by email first — covers both local and google users
          let user = await User.findOne({ email });

          if (user) {
            // User registered with email/password before — link their Google account
            if (user.authProvider === "local") {
              // user.authProvider = "google";
              user.providerId = profile.id;
              if (!user.avatarUrl) user.avatarUrl = profile.photos?.[0]?.value || "";
              await user.save();
            }
            return done(null, user);
          }

          // Brand new user — create them
          user = await User.create({
            firstName: profile.name?.givenName || "",
            lastName: profile.name?.familyName || "",
            email,
            avatarUrl: profile.photos?.[0]?.value || "",
            authProvider: "google",
            providerId: profile.id,
            emailVerified: true,
          });

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
};

export default setupPassport;