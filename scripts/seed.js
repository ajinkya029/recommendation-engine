require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Item = require("../src/models/Item");

const sampleItems = [
  { title: "React Patterns", description: "Practical patterns for scalable React apps.", category: "technology", tags: ["react", "javascript", "frontend"], popularity: 82, averageRating: 4.7 },
  { title: "Node.js in Practice", description: "Build reliable APIs with Node and Express.", category: "technology", tags: ["nodejs", "express", "backend"], popularity: 75, averageRating: 4.6 },
  { title: "MongoDB Essentials", description: "Model documents and query data effectively.", category: "technology", tags: ["mongodb", "database", "backend"], popularity: 65, averageRating: 4.4 },
  { title: "The Design of Everyday Things", description: "A classic introduction to human-centered design.", category: "design", tags: ["design", "ux", "creativity"], popularity: 91, averageRating: 4.8 },
  { title: "UX Research Basics", description: "Methods for learning from real users.", category: "design", tags: ["ux", "research", "design"], popularity: 58, averageRating: 4.3 },
  { title: "JavaScript Algorithms", description: "Solve common coding problems in JavaScript.", category: "technology", tags: ["javascript", "algorithms", "coding"], popularity: 88, averageRating: 4.9 },
  { title: "Productivity Systems", description: "Build sustainable habits for focused work.", category: "lifestyle", tags: ["productivity", "habits", "focus"], popularity: 70, averageRating: 4.2 },
  { title: "Intro to Data Science", description: "Explore data analysis and machine learning concepts.", category: "technology", tags: ["python", "data", "machine-learning"], popularity: 77, averageRating: 4.5 }
];

async function run() {
  if (!process.env.MONGODB_URI) throw new Error("Set MONGODB_URI in .env first");
  await mongoose.connect(process.env.MONGODB_URI);
  await Item.deleteMany({ title: { $in: sampleItems.map((i) => i.title) } });
  const items = await Item.insertMany(sampleItems);
  let user = await User.findOne({ email: "demo@example.com" });
  if (!user) user = await User.create({ name: "Demo User", email: "demo@example.com", preferences: ["react", "javascript", "technology", "backend"] });
  console.log(`Seeded ${items.length} items. Demo user ID: ${user._id}`);
  console.log(`Try: GET /api/recommendations/${user._id}`);
  await mongoose.disconnect();
}
run().catch(async (err) => { console.error(err); await mongoose.disconnect(); process.exit(1); });
