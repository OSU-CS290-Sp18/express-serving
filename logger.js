function logger(req, res, next) {
  console.log("== Got a request:");
  console.log("  -- URL:", req.url);
  console.log("  -- method:", req.method);
  next();
}

module.exports = logger;
