import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    idType: {
      type: String,
      enum: ["voters_card", "drivers_license", "nin", "passport"],
      required: true,
    },

    documentImage: {
      type: String,
      required: true,
    },

    selfieImage: {
      type: String,
      required: true,
    },
    rejectionReason: {
    type: String,
    default: "",
},
    status: {
      type: String,
      enum: ["not_verified", "pending", "verified", "rejected"],
      default: "not_verified",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Verification", VerificationSchema);