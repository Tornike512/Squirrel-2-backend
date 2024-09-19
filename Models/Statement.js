import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
  ipAddress: { type: String, required: true },
  statement: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const statement = mongoose.model("ip", statementSchema);

export default statement;
