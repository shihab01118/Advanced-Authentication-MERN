import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js"

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Application Started Successfully!" });
});

app.use("/api/auth", authRoutes);

app.listen(5000, async () => {
  await connectDB();
  console.log("Server is running on port 3000");
});

// MONGO_URI=mongodb+srv://shihab:wIBMR3lp8QIOTDGg@cluster0.4lkgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
