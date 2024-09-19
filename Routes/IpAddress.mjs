import express from "express";
import requestIp from "request-ip";

const sendIpPost = express.Router();

sendIpPost.use(express.json());
sendIpPost.use(requestIp.mw());

sendIpPost.post("/api/update", async (req, res) => {
  const ipAddress = req.clientIp;

  try {
    res.status(201).json({ ipAddress });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error Sending Post Request For Ip Address" });
  }
});

export default sendIpPost;
