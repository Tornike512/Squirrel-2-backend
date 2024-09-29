import express from "express";
import requestIp from "request-ip";
import votedipModel from "../Models/VotedIpsModel.mjs";

const votedips = express.Router();

votedips.use(express.json());
votedips.use(requestIp.mw());

votedips.post("/api/voted", async (req, res) => {
  const votedIps = req.clientIp;

  try {
    const newVotedIps = new votedipModel({ votedIps: votedips });
    await newVotedIps.save();

    res.status(201).send({ votedIps });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error Sending Post Request For Ip Address" });
  }
});

export default votedips;
