const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true, index: true },
  type: { type: String, enum: ["view", "like", "dislike", "purchase", "rating"], required: true },
  value: { type: Number, min: 1, max: 5 },
  context: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

interactionSchema.index({ user: 1, item: 1, type: 1 });
module.exports = mongoose.model("Interaction", interactionSchema);
