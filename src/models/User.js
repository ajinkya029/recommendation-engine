const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  preferences: [{ type: String, trim: true, lowercase: true }],
  viewedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  likedItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
