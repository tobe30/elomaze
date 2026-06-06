import Property from "../models/property.js";
import { v2 as cloudinary } from "cloudinary";

// createProperty
export const createProperty = async (req, res) => {
    try {
        const { title, description, property_type, price, priceType, address, area, proximity_note, video_link, bedrooms, bathrooms, toilets, amenities } = req.body;

        // basic validation
    if (!title || !description || !property_type || !price || !priceType || !address || !area) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "At least one service image is required" });
    }
        const agent = req.user._id; // assuming the agent is authenticated and their ID is in req.user._id

         let imageUrls = [];

             if (req.files && req.files.length > 0) {
               imageUrls = await Promise.all(
                 req.files.map(async (file) => {
                   const result = await cloudinary.uploader.upload(file.path);
                   return result.secure_url;
                 })
               );
             }

        const newProperty = new Property({
            title,
            description,
            property_type,
            price,
            priceType,
            address,
            area,
            proximity_note,
            video_link,
            bedrooms,
            bathrooms,
            toilets,
            amenities,
            images: imageUrls,
            agent
        });

        const savedProperty = await newProperty.save();
        return res.status(201).json({
        success: true,
        property: savedProperty,
});
    } catch (error) {
        console.log("Error in createProperty controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// get all properties with filters and search
export const getProperties = async (req, res) => {
  try {
    const {
      search,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
      status,
      isVerified,
    } = req.query;

    const filter = {
    status: "approved"
    };

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { address: { $regex: search, $options: "i" } },
        { area: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Property type
    if (propertyType && propertyType !== "Any") {
      filter.property_type = propertyType.toLowerCase();
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Bedrooms
    if (bedrooms && bedrooms !== "Any") {
      filter.bedrooms = { $gte: Number(bedrooms) };
    }

    // Bathrooms
    if (bathrooms && bathrooms !== "Any") {
      filter.bathrooms = { $gte: Number(bathrooms) };
    }
    
 // Availability
if (availability && availability !== "Any") {
  if (availability === "Available") {
    filter.is_available = true;
  } else if (availability === "Unavailable") {
    filter.is_available = false;
  }
} 

    // Amenities
    if (amenities) {
      const amenitiesArray = amenities.split(",");
      filter.amenities = { $all: amenitiesArray };
    }

    const properties = await Property.find(filter)
      .populate({
        path: "agent",
        select: "fullName email avatarUrl phone isVerified",
        match: isVerified === "true" ? { isVerified: true } : {},
      })
      .sort({ createdAt: -1 });
      console.log(properties);
    const filteredProperties =
      isVerified === "true"
        ? properties.filter((property) => property.agent !== null)
        : properties;

    return res.status(200).json({
      success: true,
      count: filteredProperties.length,
      properties: filteredProperties,
    });
  } catch (error) {
    console.log("Error in getProperties controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//get single property by id
export const getPropertyById = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id).populate({
            path: "agent",
            select: "fullName email avatarUrl phone isVerified",
        })

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

       return res.status(200).json({success: true, property,});
    } catch (error) {
        console.log("Error in getPropertyById controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

// updateProperty - only agent who created the property can update it
export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // ownership check
    if (property.agent.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this property",
      });
    }

    // upload new images if provided
    let imageUrls = property.images; // default = old images

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url;
        })
      );
    }

    // update fields
    const updatedProperty = await Property.findByIdAndUpdate(
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
      property: updatedProperty,
    });
  } catch (error) {
    console.log("Error in updateProperty controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// deleteProperty - only agent who created the property can delete it
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
  
      if (!property) {
        return res.status(404).json({ success: false, message: "Property not found" });
      }
         // check if the logged-in user is the owner
    if (property.agent.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            success: false,
            message: "You are not authorized to delete this property",
        })
    }

    if (property.images) {
    const imgId = property.images.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);
  }

    await Property.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Property deleted" });
        
    } catch (error) {
        console.log("Error in deleteProperty controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPropertiesByUser = async (req, res) => {
  try {
    const { id } = req.params;

    const properties = await Property.find({ agent: id }).sort({ createdAt: -1 });
    if (!properties) return res.status(404).json({ error: "User not found or has no properties" });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.log("Error in getPropertiesByUser controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// myProperties for agent dashboard - get all properties created by the logged-in agent
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.log("Error in getMyProperties controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
