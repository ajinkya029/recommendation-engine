const Item = require("../models/Item");
const User = require("../models/User");
const Interaction = require("../models/Interaction");
const asyncHandler = require("../middleware/asyncHandler");

exports.createItem = asyncHandler(async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json({ success: true, data: item });
});

exports.listItems = asyncHandler(async (req, res) => {
  const { category, tag, q, page = 1, limit = 20 } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = String(category).toLowerCase();
  if (tag) filter.tags = String(tag).toLowerCase();
  if (q) filter.$text = { $search: String(q) };
  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
  const safePage = Math.max(parseInt(page, 10) || 1, 1);
  const [items, total] = await Promise.all([
    Item.find(filter).sort({ popularity: -1, averageRating: -1 }).skip((safePage - 1) * safeLimit).limit(safeLimit),
    Item.countDocuments(filter)
  ]);
  res.json({ success: true, data: items, pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) } });
});

exports.getItem = asyncHandler(async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, isActive: true });
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  res.json({ success: true, data: item });
});

exports.recordInteraction = asyncHandler(async (req, res) => {
  const { userId, type, value, context } = req.body;
  if (!userId || !type) return res.status(400).json({ success: false, message: "userId and type are required" });
  const [user, item] = await Promise.all([User.findById(userId), Item.findById(req.params.id)]);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  if (!item) return res.status(404).json({ success: false, message: "Item not found" });
  const interaction = await Interaction.create({ user: userId, item: item._id, type, value, context });
  if (type === "view" && !user.viewedItems.some((id) => String(id) === String(item._id))) user.viewedItems.push(item._id);
  if (type === "like" && !user.likedItems.some((id) => String(id) === String(item._id))) user.likedItems.push(item._id);
  if (type === "dislike") user.likedItems = user.likedItems.filter((id) => String(id) !== String(item._id));
  if (type === "purchase") item.popularity += 5;
  if (type === "view") item.popularity += 0.1;
  if (type === "rating") {
    const ratings = await Interaction.find({ item: item._id, type: "rating", value: { $exists: true } }).select("value");
    const values = ratings.map((r) => r.value).filter(Number.isFinite);
    item.averageRating = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }
  await Promise.all([user.save(), item.save()]);
  res.status(201).json({ success: true, data: interaction });
});
