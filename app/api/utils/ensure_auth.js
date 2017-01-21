module.exports = function ensureAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    statusCode: 401,
    message: "unauthorized access to api"
  });
};
