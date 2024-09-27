import mongoose from "mongoose";

const redSchema = new mongoose.Schema({
  red: { type: Number, required: false },
  timestamp: { type: Date, default: Date.now },
});

const red = mongoose.model("red", redSchema);

export default red;
