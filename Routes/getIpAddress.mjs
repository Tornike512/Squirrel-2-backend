import express from "express";
import statement from "../Models/Statement.mjs";

const getIpAddress = express.Router();

getIpAddress.use(express.json());

getIpAddress.get("/api/get", async (req, res) => {
  try {
    const result = await statement.find();
    res.json(result);
  } catch (error) {
    res.status(500).send({ Message: "Couldn't Send Get Request" });
  }
});

export default getIpAddress;
