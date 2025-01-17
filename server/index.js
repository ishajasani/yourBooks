import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import bookRoutes from './routes/books.js';

dotenv.config();

const hostname = "127.0.0.1";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

const server = express();

const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

server.use(cors(corsOptions));
server.use(express.json());
server.use("/api/auth", authRoutes);
server.use('/api/books', bookRoutes);

const port = process.env.PORT || 8000;

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
