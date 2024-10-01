import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import sendIpPost from "./Routes/IpAddress.mjs";
import getIpAddress from "./Routes/getIpAddress.mjs";
import { Server } from "socket.io";
import { createServer } from "http";
import votesModel from "./Models/VotesModel.mjs";
import green from "./Models/GreenModel.mjs";
import red from "./Models/RedModel.mjs";
import getVotedIpAddress from "./Routes/getVotedIps.mjs";
import votedips from "./Routes/votedIps.mjs";

const PORT = process.env.PORT || 4500;

dotenv.config();

const app = express();
app.use(
  cors({
    origin:
      "https://66fc1cc190696c70aaa368c1--rainbow-marzipan-315b5b.netlify.app",
    credentials: true,
  })
);
app.use(express.json());

const server = createServer(app);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

const io = new Server(server, {
  cors: {
    origin: `https://66fc1cc190696c70aaa368c1--rainbow-marzipan-315b5b.netlify.app`,
    credentials: true,
  },
});

app.use(sendIpPost);
app.use(getIpAddress);
app.use(votedips);
app.use(getVotedIpAddress);

let vote = 0;
let redCount = 1;
let greenCount = 1;

io.on("connection", async (socket) => {
  const latestVote = await votesModel.findOne().sort({ timestamp: -1 });
  const latestRed = await red.findOne().sort({ timestamp: -1 });
  const latestGreen = await green.findOne().sort({ timestamp: -1 });

  io.emit("sendVote", latestVote ? latestVote.votes : 0);
  io.emit("sendGreen", latestGreen ? latestGreen.green : 0);
  io.emit("sendRed", latestRed ? latestRed.red : 0);

  socket.on("updateVote", async () => {
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

  socket.on("updateRed", async () => {
    if (latestRed) {
      latestRed.red++;

      await latestRed.save();

      io.emit("sendRed", latestRed.red);
    } else {
      const newRed = new red({ red: redCount });

      await newRed.save();
      io.emit("sendRed", newRed.red);
    }
  });

  socket.on("updateGreen", async () => {
    if (latestGreen) {
      latestGreen.green++;

      await latestGreen.save();

      io.emit("sendGreen", latestGreen.green);
    } else {
      const newGreen = new green({ green: greenCount });

      await newGreen.save();
      io.emit("sendGreen", newGreen.green);
    }
  });

  socket.on("disconnect", () => {
    console.log("someone has left");
  });
});

server.listen(PORT, () => {
  console.log("the server is running");
});
