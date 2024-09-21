import mongoose from "mongoose";

const votesSchema = new mongoose.Schema({
  votes: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const votesModel = mongoose.model("votesCount", votesSchema);

export default votesModel;
