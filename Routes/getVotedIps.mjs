import express from "express";
import votedipModel from "../Models/VotedIpsModel.mjs";

const getVotedIpAddress = express.Router();

getVotedIpAddress.use(express.json());

getVotedIpAddress.get("/api/getVoted", async (req, res) => {
  try {
    const result = await votedipModel.find();
    res.status(200).json(result);
  } catch (error) {
    console.log("Error Sending get Votes Request", error);
  }
});

export default getVotedIpAddress;
