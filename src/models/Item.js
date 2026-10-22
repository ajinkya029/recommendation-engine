const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  description: { type: String, default: "", maxlength: 2000 },
  category: { type: String, required: true, trim: true, lowercase: true },
  tags: [{ type: String, trim: true, lowercase: true }],
  popularity: { type: Number, default: 0, min: 0 },
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  imageUrl: { type: String, default: "" },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

itemSchema.index({ category: 1, isActive: 1 });
itemSchema.index({ tags: 1 });
module.exports = mongoose.model("Item", itemSchema);
