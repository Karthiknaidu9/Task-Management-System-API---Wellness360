module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "Basic YWRtaW46cGFzc3dvcmQ=") {
    // Base64 of "admin:password"
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
