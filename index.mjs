import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import sendIpPost from "./Routes/IpAddress.mjs";
import getIpAddress from "./Routes/GetIpAddress.mjs";

const PORT = process.env.PORT || 4500;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(sendIpPost);

app.use(getIpAddress);

app.listen(PORT, () => {
  console.log("the server is running");
});
