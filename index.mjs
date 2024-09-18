import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(cors());

// Connect to Database using mongoDB

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST", "PUT"] },
});

io.on("connection", (socket) => {
  console.log(`User Connected:${socket.id}`);
});
