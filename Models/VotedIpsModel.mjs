import mongoose from "mongoose";

const votedIpSchema = new mongoose.Schema({
  votedIp: { type: String, required: false },
  timestamp: { type: Date, default: Date.now },
});

const votedipModel = mongoose.model("votedIps", votedIpSchema);

export default votedipModel;
