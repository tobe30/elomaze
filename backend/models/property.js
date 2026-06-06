import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    property_type: {
      type: String,
      required: true,
      enum: ["apartment", "self-contain", "duplex", "hostel", "room", "shop", "flat", "house", "studio"],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    priceType: {
    type: String,
    required: true,
    enum: ["monthly", "yearly", "weekly", "daily"],
    default: "yearly",
    index: true,
},

    address: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    proximity_note: {
      type: String,
    },

    video_link: {
      type: String,
    },

    bedrooms: {
      type: Number,
      min: 0,
    },

    bathrooms: {
      type: Number,
      min: 0,
    },

    toilets: {
      type: Number,
      min: 0,
    },

    amenities: [
      {
        type: String,
        trim: true,
      },
    ],

    images: [
      {
        type: String, // image URLs (Cloudinary / S3)
      },
    ],

    is_available: {
      type: Boolean,
      default: true,
      index: true,
    },

    available_from: {
      type: Date,
    },

    status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
},

    // 🔥 Agent reference (foreign key to User)
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// Useful indexes for filtering
PropertySchema.index({ price: 1 });
PropertySchema.index({ property_type: 1 });
PropertySchema.index({ area: 1 });
PropertySchema.index({ createdAt: -1 });

export default mongoose.model("Property", PropertySchema);