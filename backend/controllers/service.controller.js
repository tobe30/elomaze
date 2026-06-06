import Service from "../models/service.js";
import { v2 as cloudinary } from "cloudinary";

export const createService = async (req, res) => {
  try {
    const { serviceData } = req.body;

    if (!serviceData) {
      return res.status(400).json({ message: "serviceData is required" });
    }

    let parsedData;

    try {
      parsedData =
        typeof serviceData === "string" ? JSON.parse(serviceData) : serviceData;
    } catch (err) {
      return res.status(400).json({ message: "Invalid serviceData JSON format" });
    }

    const {
      title,
      description,
      category,
      price,
      priceType,
      serviceAreas,
      experience,
      availability,
      whatsIncluded,
      workingHours,
      serviceDuration,
    } = parsedData;

    if (!title || !description || !category || !price || !serviceAreas) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
  return res.status(400).json({ message: "At least one service image is required" });
}

    const provider = req.user._id;

    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
    }

    const newService = await Service.create({
      title,
      description,
      category,
      price,
      priceType,
      serviceAreas,
      experience,
      availability,
      images: imageUrls,
      whatsIncluded,
      workingHours,
      serviceDuration,
      provider,
    });

    return res.status(201).json({
      success: true,
      service: newService,
    });
  } catch (error) {
    console.log("Error in createService controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getServices = async (req, res) => {
  try {
    const {
      search,
      category,
      availability,
      serviceDuration,
      minPrice,
      maxPrice,
      location,
      verified,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { serviceAreas: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Category
    if (category && category !== "Any") {
      filter.category = category;
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Location -> serviceAreas
    if (location) {
      filter.serviceAreas = { $regex: location, $options: "i" };
    }

    // Availability (supports multiple values from frontend)
    if (availability) {
      const availabilityArray = availability.split(",");
      filter.availability = { $in: availabilityArray };
    }

    // Service duration
    if (serviceDuration && serviceDuration !== "Any") {
      filter.serviceDuration = serviceDuration;
    }

    const services = await Service.find(filter)
      .populate({
        path: "provider",
        select: "fullName email avatarUrl phone isVerified",
        match: verified === "true" ? { isVerified: true } : {},
      })
      .sort({ createdAt: -1 });

    const filteredServices =
      verified === "true"
        ? services.filter((service) => service.provider !== null)
        : services;

    return res.status(200).json({
      success: true,
      count: filteredServices.length,
      services: filteredServices,
    });
  } catch (error) {
    console.log("Error in getServices controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id).populate({
      path: "provider",
      select: "fullName email avatarUrl phone isVerified",
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.log("Error in getServiceById controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Update service (only by owner)
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // ownership check
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this service",
      });
    }

    // default images = old images
    let imageUrls = service.images;

    // if new images uploaded → replace
    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        ...req.body,
        images: imageUrls,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      service: updatedService,
    });
  } catch (error) {
    console.log("Error in updateService controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
  
      if (!service) {
        return res.status(404).json({ success: false, message: "Service not found" });
      }
         // check if the logged-in user is the owner
    if (service.provider.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this service",
        })

      }
      if (service.images) {
    const imgId = service.images.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);
  }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Service deleted" });
        
    } catch (error) {
        console.log("Error in deleteService controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getServicesByProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const services = await Service.find({ provider: id }).sort({ createdAt: -1 });
    if (!services) return res.status(404).json({ error: "Provider not found or has no services" });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.log("Error in getServicesByProvider controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// myServices for user dashboard - get all services created by the logged-in user
export const getMyServices = async (req, res) => {
  try {
    const services = await Service.find({ provider: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.log("Error in getMyServices controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};