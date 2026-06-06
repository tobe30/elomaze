import User from "../models/User.js";
import Property from "../models/property.js";
import Service from "../models/service.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in getAllUsers controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdminProperties = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};

    // Admin can see ALL statuses
    if (status && status !== "Any") {
      filter.status = status;
    }

    const properties = await Property.find(filter)
      .populate("agent", "fullName email avatarUrl phone isVerified")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.log("Error in getAdminProperties", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "firstName lastName email");

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    console.log("Error in getAllServices controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const approveProperty = async (req, res) => {

    try {
         const { id } = req.params;

  const property = await Property.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  );

  res.json({
    success: true,
    message: "Property approved",
    property,
  });
    } catch (error) {
         console.log("Error in approveProperty controller", error);
          return res.status(500).json({ message: "Internal Server Error" });
    }
 
};

export const rejectProperty = async (req, res) => {

    try {
  const { id } = req.params;

  const property = await Property.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  res.json({
    success: true,
    message: "Property rejected",
    property,
  });
    } catch (error) {
         console.log("Error in rejectProperty controller", error);
          return res.status(500).json({ message: "Internal Server Error" });
    }

};

export const approveService = async (req, res) => {
    try {
    const { id } = req.params;

  const service = await Service.findByIdAndUpdate(
    id,
    { status: "approved" },
    { new: true }
  );

  res.json({ success: true, service });
    } catch (error) {
        console.log("Error in approveService controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


};

export const rejectService = async (req, res) => {
    try {
  const { id } = req.params;

  const services = await Service.findByIdAndUpdate(
    id,
    { status: "rejected" },
    { new: true }
  );

  res.json({
    success: true,
    message: "service rejected",
    services,
  });
    } catch (error) {
         console.log("Error in rejectServices controller", error);
          return res.status(500).json({ message: "Internal Server Error" });
    }

};