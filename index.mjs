import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
    server.listen(3001, () => {
      console.log("the server is running");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });

// Set Up Socket.io
