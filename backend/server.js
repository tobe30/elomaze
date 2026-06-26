import express from "express"
import cors from "cors";
import 'dotenv/config';
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import propertyRoutes from "./routes/property.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectCloudinary from "./lib/cloudinary.js";
import verificationRoutes from "./routes/verification.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import ratingRoutes from "./routes/rating.routes.js";
import passport from "passport";
import setupPassport from "./config/passport.js";
import authGoogleRoutes from "./routes/authGoogle.js";

const app = express();
await connectCloudinary();

app.use(cors({
  origin: "http://localhost:5173", // Adjust this to your frontend URL
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

setupPassport();

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("server is running testing")
  // res.status(200).json({msg:"api is up and running"})
})
app.use("/api/auth", authRoutes)
app.use("/api/auth", authGoogleRoutes);
app.use("/api/property", propertyRoutes)
app.use("/api/service", serviceRoutes)
app.use("/api/user", userRoutes)
app.use("/api/verification", verificationRoutes)
app.use("/api/chat", chatRoutes);
app.use("/api/rating", ratingRoutes)



const PORT= process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    console.log("DB connected")

     app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
}
startServer();