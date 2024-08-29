import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/Databases.js";
import passport from "passport";
import userRoutes from "./src/routes/userRoutes.js";
import "./src/config/passport-jwt-strategy.js"

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// This will solve CORS Policy Error
const corsOptions = {
  // set origin to a specific origin.
  origin: process.env.FRONTEND_HOST,
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

// Passport Middleware
app.use(passport.initialize());

// Cookie Parser
app.use(cookieParser());

// Load Routes
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
