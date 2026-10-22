function notFound(req, res, _next) {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
}
function errorHandler(err, _req, res, _next) {
  const status = err.statusCode || (err.name === "ValidationError" ? 400 : 500);
  const message = err.code === 11000 ? "A record with that unique value already exists." : err.message || "Server error";
  if (process.env.NODE_ENV !== "test") console.error(err);
  res.status(status).json({ success: false, message });
}
module.exports = { notFound, errorHandler };
