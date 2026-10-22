/**
 * Content-based baseline recommender:
 * - rewards matching user preferences, item category, and item tags
 * - adds popularity and rating signals
 * - downranks items the user already liked or viewed
 *
 * This is intentionally explainable and works without a training pipeline.
 * Replace/extend with collaborative filtering once interaction volume grows.
 */
function scoreItem(item, user, interactions = []) {
  const preferences = new Set((user.preferences || []).map(normalize));
  const tags = (item.tags || []).map(normalize);
  const category = normalize(item.category);
  const matchingPreferences = [
    ...(preferences.has(category) ? [category] : []),
    ...tags.filter((tag) => preferences.has(tag))
  ];
  const uniqueMatches = [...new Set(matchingPreferences)];

  const popularityScore = Math.min(Number(item.popularity || 0) / 100, 1) * 10;
  const ratingScore = (Number(item.averageRating || 0) / 5) * 10;
  const preferenceScore = Math.min(uniqueMatches.length * 8, 32);
  const categoryBonus = preferences.has(category) ? 8 : 0;
  const seen = (user.viewedItems || []).some((id) => String(id) === String(item._id));
  const liked = (user.likedItems || []).some((id) => String(id) === String(item._id));
  const interactionTypes = interactions.filter((i) => String(i.item) === String(item._id)).map((i) => i.type);
  const disliked = interactionTypes.includes("dislike");
  const score = preferenceScore + categoryBonus + popularityScore + ratingScore
    - (seen ? 12 : 0) - (liked ? 18 : 0) - (disliked ? 30 : 0);

  return {
    score: Math.round(score * 100) / 100,
    reason: uniqueMatches.length
      ? `Matches your interests: ${uniqueMatches.join(", ")}`
      : preferences.has(category)
        ? `In your preferred category: ${category}`
        : "Popular and highly rated"
  };
}
function normalize(value) { return String(value || "").trim().toLowerCase(); }
module.exports = { scoreItem };
