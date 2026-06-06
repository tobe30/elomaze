import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Cleaning", "Moving & Relocation", "Plumbing", "Electrical", "Painting",
        "Carpentry", "Appliance Repair", "Pest Control", "Gardening", "Security",
        "Laundry", "Catering", "Photography", "Interior Design", "AC Repair",
        "Generator Repair", "Other",
      ],
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    priceType: {
      type: String,
      enum: ["fixed", "hourly", "daily", "weekly", "monthly", "negotiable"],
      default: "fixed",
    },

    serviceAreas: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },

    availability: {
      type: String,
      enum: ["Weekdays Only", "Weekends Only", "24/7 Available",
            "Mornings Only", "Evenings Only",],
      default: "24/7 Available",
    },

    images: [
      {
        type: String,
      },
    ],
whatsIncluded: [
  {
    type: String,
    enum: [
      "Materials Included",
      "Transport Included",
      "After-Service Support",
      "Warranty Available",
      "Free Consultation",
    ],
  },
],

    workingHours: {
        type: String,
        enum: ["Morning", "Afternoon", "Evening", "Weekends", "Flexible"],
        default: "Flexible",
    },

    serviceDuration: {
        type: String,
        enum: ["30 minutes", "1 hour", "2 hours", "Half Day", "Full Day", "Depends on Job"],
        default: "Depends on Job",
    },

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ category: 1 });
ServiceSchema.index({ serviceAreas: 1 });
ServiceSchema.index({ price: 1 });
ServiceSchema.index({ availability: 1 });
ServiceSchema.index({ createdAt: -1 });

export default mongoose.model("Service", ServiceSchema);