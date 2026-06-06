import mongoose from "mongoose";

const SavedPropertySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },
  },
  { timestamps: true }
);

// prevent same user from saving same property twice
SavedPropertySchema.index({ user: 1, property: 1 }, { unique: true });

export default mongoose.model("SavedProperty", SavedPropertySchema);