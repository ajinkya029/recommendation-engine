const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const recommendationRoutes = require("./routes/recommendationRoutes");
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*"
}));
app.use(express.json({ limit: "1mb" }));
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "recommendation-engine-api", timestamp: new Date().toISOString() });
});
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.use(notFound);
app.use(errorHandler);
module.exports = app;
