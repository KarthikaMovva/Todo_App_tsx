const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = userId;
    next();
  } catch {
    res.status(403).json({ error: "Invalid token" });
  }
};
