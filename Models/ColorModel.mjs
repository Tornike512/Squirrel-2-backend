import mongoose from "mongoose";

const ColorSchema = new mongoose.Schema({
  red: { type: Number, required: false },
  green: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const color = mongoose.model("color", ColorSchema);

export default color;
