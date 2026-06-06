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

const app = express();
await connectCloudinary();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server is running testing")
  // res.status(200).json({msg:"api is up and running"})
})
app.use("/api/auth", authRoutes)
app.use("/api/property", propertyRoutes)
app.use("/api/service", serviceRoutes)
app.use("/api/user", userRoutes)
app.use("/api/verification", verificationRoutes)
app.use("/api/chat", chatRoutes);



const PORT= process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    console.log("DB connected")

     app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", err);
  }
}
startServer();