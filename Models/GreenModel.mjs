import mongoose from "mongoose";

const GreenSchema = new mongoose.Schema({
  green: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const green = mongoose.model("green", GreenSchema);

export default green;
