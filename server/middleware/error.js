const routeNotFound = (req, res, next) => {
  const message = `Route not found: ${req.originalUrl}`;
  res.status(404).json({ success: false, status: 404, message });
};

module.exports = { routeNotFound }