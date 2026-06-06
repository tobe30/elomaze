import { v2 as cloudinary } from "cloudinary";
import Verification from "../models/verification.js";
import User from "../models/User.js";


export const submitVerification = async (req, res) => {
  try {
    const { idType } = req.body;
    const userId = req.user._id;

    if (!idType) {
      return res.status(400).json({ message: "idType is required" });
    }

    if (!req.files || !req.files.documentImage || !req.files.selfieImage) {
      return res.status(400).json({
        message: "Both documentImage and selfieImage are required",
      });
    }

    const documentImage = req.files.documentImage[0];
    const selfieImage = req.files.selfieImage[0];

    let verification = await Verification.findOne({ user: userId });

    if (verification && verification.status === "pending" || verification.status === "verified") {
      return res.status(400).json({
        message: "You already have an active verification",
      });
    }

    const documentUpload = await cloudinary.uploader.upload(
      documentImage.path,
      { folder: "elomaze/verifications" }
    );

    const selfieUpload = await cloudinary.uploader.upload(
      selfieImage.path,
      { folder: "elomaze/verifications" }
    );

    if (verification) {
      if (verification.documentImage) {
        const oldDocumentPublicId = verification.documentImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(oldDocumentPublicId);
      }

      if (verification.selfieImage) {
        const oldSelfiePublicId = verification.selfieImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(oldSelfiePublicId);
      }

      verification.idType = idType;
      verification.documentImage = documentUpload.secure_url;
      verification.selfieImage = selfieUpload.secure_url;
      verification.status = "pending";

      verification = await verification.save();
    } else {
      verification = await Verification.create({
        user: userId,
        idType,
        documentImage: documentUpload.secure_url,
        selfieImage: selfieUpload.secure_url,
        status: "pending",
      });
    }

    res.status(201).json({
      success: true,
      message: "Verification submitted successfully",
      verification,
    });
  } catch (error) {
    console.log("Error in submitVerification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveVerification = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const verification = await Verification.findById(verificationId).populate("user");

    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }

   if (verification.status === "verified") {
      return res.status(400).json({ message: "User is already verified" });
    }

    verification.status = "verified";
    verification.rejectionReason = "";

    await verification.save();

    await User.findByIdAndUpdate(verification.user, {
      isVerified: true,
    });

    res.status(200).json({
      success: true,
      message: "Verification approved successfully",
      verification,
    });

  } catch (error) {
    console.log("Error in approveVerification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export const rejectVerification = async (req, res) => {
  try {
    const { verificationId } = req.params;
    const { rejectionReason } = req.body;

    const verification = await Verification.findById(verificationId);

    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }

    verification.status = "rejected";
    verification.rejectionReason = rejectionReason || "Verification was rejected";

    await verification.save();

    await User.findByIdAndUpdate(verification.user, {
      isVerified: false,
    });

    res.status(200).json({
      success: true,
      message: "Verification rejected successfully",
      verification,
    });
  } catch (error) {
    console.log("Error in rejectVerification controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMyVerificationStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    const verification = await Verification.findOne({ user: userId });

    if (!verification) {
      return res.status(200).json({
        success: true,
        verificationStatus: "not_verified",
        verification: null,
      });
    }

    res.status(200).json({
      success: true,
      verificationStatus: verification.status,
      verification,
    });
  } catch (error) {
    console.log("Error in getMyVerificationStatus controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};