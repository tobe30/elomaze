import property from "../models/property.js";

export const createProperty = async (req, res) => {
    try {
        const { title, description, property_type, price, priceType, address, area, proximity_note, video_link, bedrooms, bathrooms, toilets, amenities, images } = req.body;

        // basic validation
    if (!title || !description || !property_type || !price || !priceType || !address || !area) {
      return res.status(400).json({ message: "Missing required fields" });
    }
        const agent = req.user._id; // assuming the agent is authenticated and their ID is in req.user._id

        const newProperty = new property({
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
            images,
            agent
        });

        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        console.log("Error in createProperty controller", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getProperties = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}