import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/user", userRoutes);

export default app;
