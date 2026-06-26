import SavedProperty from "../models/savedproperty.js";
import Property from "../models/property.js";
import Service from "../models/service.js";
import SavedService from "../models/savedservice.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid user ID" });
    // }
    const user = await User.findById(id).select(
      "fullName email avatarUrl phone isVerified bio"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in getUserProfile controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const updateUserProfile = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { firstName, lastName, phone, email, bio, locationPreference } = req.body;

//     if (id !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this profile",
//       });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id,
//       {
//         firstName,
//         lastName,
//         phone,
//         email,
//         bio,
//         ...(locationPreference && { locationPreference }) // 👈 clean conditional update
//       },
//       { new: true, runValidators: true }
//     ).select("-password");

//     res.status(200).json({
//       success: true,
//       user: updatedUser,
//     });

//   } catch (error) {
//     console.error("Update profile error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

export const updateUserProfile = async (req, res) => {
  try {
     const id = req.user._id;
    const { firstName, lastName, phone, email, bio, locationPreference, avatarUrl } = req.body;

    const updateData = {};

    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (phone !== undefined) updateData.phone = phone;
    if (email !== undefined) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;

    if (locationPreference !== undefined) {
      if (locationPreference.country !== undefined) {
        updateData["locationPreference.country"] = locationPreference.country;//
      }
      if (locationPreference.state !== undefined) {
        updateData["locationPreference.state"] = locationPreference.state;
      }
      if (locationPreference.city !== undefined) {
        updateData["locationPreference.city"] = locationPreference.city;
      }
      if (locationPreference.area !== undefined) {
        updateData["locationPreference.area"] = locationPreference.area;
      }
    }

    // Check if profile is now complete (all required fields filled)
    const currentUser = await User.findById(id);
    const finalFirstName = updateData.firstName ?? currentUser.firstName;
    const finalLastName = updateData.lastName ?? currentUser.lastName;
    const finalPhone = updateData.phone ?? currentUser.phone;
    const finalBio = updateData.bio ?? currentUser.bio;
    const finalAvatarUrl = updateData.avatarUrl ?? currentUser.avatarUrl;

    const isProfileComplete = !!(
      finalFirstName?.trim() &&
      finalLastName?.trim() &&
      finalPhone?.trim() &&
      finalBio?.trim() &&
      finalAvatarUrl?.trim()
    );

    updateData.profileCompleted = isProfileComplete;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -providerId");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};



export const changeUserPassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await User.findById(userId).select("+password");// need to select password for comparison

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const salt = await bcrypt.genSalt(10);//
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// controllers for user routes related to saving properties
// save a property
export const saveProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const alreadySaved = await SavedProperty.findOne({
      user: req.user._id,
      property: propertyId,
    });

    if (alreadySaved) {
      return res.status(400).json({ message: "Property already saved" });
    }

    const savedProperty = await SavedProperty.create({
      user: req.user._id,
      property: propertyId,
    });

    return res.status(201).json({
      success: true,
      savedProperty,
    });
  } catch (error) {
    console.log("Error in saveProperty controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all saved properties for logged in user
export const getSavedProperties = async (req, res) => {
  try {
    const savedProperties = await SavedProperty.find({ user: req.user._id })
      .populate({
        path: "property",
        populate: {
          path: "agent",
          select: "fullName email avatarUrl phone isVerified",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: savedProperties.length,
      savedProperties,
    });
  } catch (error) {
    console.log("Error in getSavedProperties controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// unsave a property
export const unsaveProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const savedProperty = await SavedProperty.findOneAndDelete({
      user: req.user._id,
      property: propertyId,
    });

    if (!savedProperty) {
      return res.status(404).json({ message: "Saved property not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Property removed from saved properties",
    });
  } catch (error) {
    console.log("Error in unsaveProperty controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//save a service
export const saveService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const alreadySaved = await SavedService.findOne({
      user: req.user._id,
      service: serviceId,
    });

    if (alreadySaved) {
      return res.status(400).json({ message: "Service already saved" });
    }

    const savedService = await SavedService.create({
      user: req.user._id,
      service: serviceId,
    });

    return res.status(201).json({
      success: true,
      savedService,
    });
  } catch (error) {
    console.log("Error in saveService controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all saved services for logged in user
export const getSavedServices = async (req, res) => {
  try {
    const savedServices = await SavedService.find({ user: req.user._id })
      .populate({
        path: "service",
        populate: {
          path: "provider",
          select: "fullName email avatarUrl phone isVerified",
        },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: savedServices.length,
      savedServices,
    });
  } catch (error) {
    console.log("Error in getSavedServices controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// unsave a service
export const unsaveService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const savedService = await SavedService.findOneAndDelete({
      user: req.user._id,
      service: serviceId,
    });

    if (!savedService) {
      return res.status(404).json({ message: "Saved service not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Service removed from saved services",
    });
  } catch (error) {
    console.log("Error in unsaveService controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};




// import User from "../models/user.js";
// import mongoose from "mongoose";

// export const updateUserProfile = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }

//     if (id !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You are not authorized to update this profile",
//       });
//     }

//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     user.fullName = req.body.fullName || user.fullName;
//     user.username = req.body.username || user.username;
//     user.phone = req.body.phone || user.phone;
//     user.avatarUrl = req.body.avatarUrl || user.avatarUrl;
//     user.bio = req.body.bio || user.bio;

//     const updatedUser = await user.save();

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: {
//         _id: updatedUser._id,
//         fullName: updatedUser.fullName,
//         username: updatedUser.username,
//         email: updatedUser.email,
//         phone: updatedUser.phone,
//         avatarUrl: updatedUser.avatarUrl,
//         bio: updatedUser.bio,
//         isVerified: updatedUser.isVerified,
//       },
//     });
//   } catch (error) {
//     console.log("Error in updateUserProfile controller", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };