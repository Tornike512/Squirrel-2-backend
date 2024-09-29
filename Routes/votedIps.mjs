import express from "express";
import requestIp from "request-ip";
import votedipModel from "../Models/VotedIpsModel.mjs";

const sendVotedIps = express.Router();

sendVotedIps.use(express.json());
sendVotedIps.use(requestIp.mw());

sendVotedIps.post("/api/voted", async (req, res) => {
  const votedIps = req.clientIp;

  try {
    const newVotedIps = new votedipModel({ votedIps });
    await newVotedIps.save();

    res.status(201).send({ votedIps });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error Sending Post Request For Ip Address" });
  }
});

export default sendVotedIps;
