import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Enable if you need to pass cookies or authentication headers
  })
);

// Routes
app.use("/api/user", userRoutes);

export default app;
