import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MongoURL);
  console.log("Database has been connected");
};

app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/user", authRoutes);
app.use("/api/notes", noteRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/public")));
// --------------------------deployment------------------------------

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong...";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.ServerPort, () => {
  console.log(`Server is connected at ${process.env.ServerPort}`);
  connect();
});
