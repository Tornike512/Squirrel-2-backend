import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  hasVoted: { type: Boolean, required: false },
  statement: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const statement = mongoose.model("ip", statementSchema);

export default statement;
