import express from "express";
import votedipModel from "../Models/VotedIpsModel.mjs";

const votedips = express.Router();

votedips.use(express.json());

votedips.post("/api/voted", async (req, res) => {
  const votedIp = req.body;
  try {
    const newVotedIps = new votedipModel(votedIp);
    await newVotedIps.save();

    res.status(201).send(votedIp);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error Sending Post Request For Ip Address" });
  }
});

export default votedips;
