import express from "express";
import requestIp from "request-ip";
import statement from "../Models/Statement.mjs";

const sendIpPost = express.Router();

sendIpPost.use(express.json());
sendIpPost.use(requestIp.mw());

sendIpPost.post("/api/update", async (req, res) => {
  const ipAddress = req.clientIp;

  const ipArray = await statement.find({}, { ipAddress: 1, _id: 0 });

  if (ipArray.includes(ipAddress)) {
    try {
      const newIpAddress = new statement({ ipAddress });
      await newIpAddress.save();

      res.status(201).send({ ipAddress });
    } catch (error) {
      res
        .status(404)
        .json({ message: "Error Sending Post Request For Ip Address" });
    }
  } else {
    return;
  }
});

export default sendIpPost;
