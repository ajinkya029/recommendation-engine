const User = require("../models/User");
const Item = require("../models/Item");
const Interaction = require("../models/Interaction");
const asyncHandler = require("../middleware/asyncHandler");
const { scoreItem } = require("../utils/recommendationEngine");

exports.getRecommendations = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
  const category = req.query.category ? String(req.query.category).toLowerCase() : null;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  const filter = { isActive: true };
  if (category) filter.category = category;
  const [items, interactions] = await Promise.all([
    Item.find(filter).lean(),
    Interaction.find({ user: user._id }).select("item type").lean()
  ]);

  const recommendations = items
    .map((item) => ({ ...item, ...scoreItem(item, user, interactions) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => ({
      ...item,
      recommendation: { score: item.score, reason: item.reason },
      score: undefined,
      reason: undefined
    }));

  res.json({
    success: true,
    data: recommendations,
    meta: { userId, count: recommendations.length, algorithm: "content-based-baseline" }
  });
});
