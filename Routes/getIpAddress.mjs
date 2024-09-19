import express from "express";

const getIpAddress = express.Router();

getIpAddress.use(express.json());

getIpAddress.get("/api/get", async (req, res) => {});

export default getIpAddress;
