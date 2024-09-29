import express from "express";
import requestIp from "request-ip";
import statement from "../Models/Statement.mjs";

const sendIpPost = express.Router();

sendIpPost.use(express.json());
sendIpPost.use(requestIp.mw());

sendIpPost.post("/api/update", async (req, res) => {
  const ipAddress = req.clientIp;
  const hasVoted = req.body.hasVoted;

  try {
    const newIpAddress = new statement({ ipAddress, hasVoted });

    await newIpAddress.save();

    res.status(201).send({ ipAddress, hasVoted });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error Sending Post Request For Ip Address" });
  }
});

export default sendIpPost;
