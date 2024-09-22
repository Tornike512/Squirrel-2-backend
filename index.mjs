import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
// import sendIpPost from "./Routes/IpAddress.mjs";
// import getIpAddress from "./Routes/getIpAddress.mjs";
import { Server } from "socket.io";
import votesModel from "./Models/VotesModel.mjs";

const PORT = process.env.PORT || 4500;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

// app.use(sendIpPost);

// app.use(getIpAddress);

let vote = 0;

const io = new Server({
  cors: { origin: `http://localhost:5173` },
});

io.on("connection", (socket) => {
  io.emit("sendVote", vote);

  socket.on("updateVote", async () => {
    const latestVote = await votesModel.findOne().sort({ timestamp: -1 });

    if (latestVote) {
      latestVote.votes++;

      await latestVote.save();

      io.emit("sendVote", latestVote.votes);
    } else {
      const newVote = new votesModel({ votes: vote });
      await newVote.save();

      io.emit("sendVote", newVote.votes);
    }
  });

  socket.on("disconnect", () => {
    console.log("someone has left");
  });
});

io.listen(PORT);

// app.listen(PORT, () => {
//   console.log("the server is running");
// });
