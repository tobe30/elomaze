import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Basic identity
    fullName: 
    { type: String,
      trim: true, 
      default: "" 
    },

    username: {
      type: String,
      default: "" ,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: { type: String, trim: true },

    // Auth
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    providerId: { type: String, sparse: true }, // Google "sub" id

    // Only required for normal signup
    password: {
      type: String,
      required: function () {
        return this.authProvider === "local";
      },
      minlength: 6,
      select: false,
    },

    // Roles
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
      index: true,
    },

    // Public profile
    avatarUrl: { type: String, default: "" },
    bio: { type: String, default: "", maxlength: 280 },

    // Trust
    isVerified: { type: Boolean, default: false },
    trustScore: { type: Number, default: 0, min: 0, max: 100},

    // Location preference
    locationPreference: {
      country: { type: String, default: "Nigeria" },
      state: { type: String, default: "" },
      city: { type: String, default: "" },
      area: { type: String, default: "" },
    },

    // Optional geo
    lastKnownLocation: {
      type: { type: String, enum: ["Point"], default: undefined },
      coordinates: { type: [Number], default: undefined }, // [lng, lat]
      updatedAt: { type: Date },
    },

    // Settings
    settings: {
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      privacy: {
        showPhone: { type: Boolean, default: false },
        showEmail: { type: Boolean, default: false },
      },
    },

    // Moderation
    isBlocked: { type: Boolean, default: false, index: true },
    blockedReason: { type: String, default: "" },
    reported: { type: Boolean, default: false, index: true },

    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// Unique indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true, sparse: true });

// Geo index
UserSchema.index({ lastKnownLocation: "2dsphere" });

export default mongoose.model("User", UserSchema);