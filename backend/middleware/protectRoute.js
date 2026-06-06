import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// agent-only (or agent + admin) middleware
// export const verifyAgent = (req, res, next) => {
//   if (req.user?.role === "agent" || req.user?.role === "admin") {
//     return next();
//   }
//   return res.status(403).json({ message: "Forbidden - Agents only" });
// };

// admin middleware
// export const verifyAdmin = (req, res, next) => {
//   if (req.user?.role === "admin") return next();
//   return res.status(403).json({ message: "Forbidden - Admins only" });
// };
// export const allowRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };