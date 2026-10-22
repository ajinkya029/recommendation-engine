const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, preferences = [] } = req.body;
  if (!name || !email) return res.status(400).json({ success: false, message: "name and email are required" });
  const user = await User.create({ name, email, preferences });
  res.status(201).json({ success: true, data: user });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate("likedItems viewedItems");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user });
});

exports.updatePreferences = asyncHandler(async (req, res) => {
  const preferences = req.body.preferences;
  if (!Array.isArray(preferences)) return res.status(400).json({ success: false, message: "preferences must be an array of strings" });
  const user = await User.findByIdAndUpdate(req.params.id, { preferences }, { new: true, runValidators: true });
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, data: user });
});
