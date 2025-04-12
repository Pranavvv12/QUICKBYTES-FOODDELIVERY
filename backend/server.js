import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import 'dotenv/config';
import orderRouter from "./routes/orderRoute.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: "https://quickbytes-fooddelivery-frontend.onrender.com",
    credentials: true,
  }));
  

// Database Connection
connectDB();

// API Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)
// Root API Test
app.get("/", (req, res) => {
    res.send("API WORKING");
});

// Start Server
app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});

//mongodb+srv://userquickbytes:user123@cluster0.r50ov.mongodb.net/?