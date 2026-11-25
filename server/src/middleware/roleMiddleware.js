const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check whether the user is authenticated
    if (!req.user) {
      return res.status(401).json({
        message: "Please log in first.",
      });
    }

    // Check whether the user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }

    // Allow the request to continue
    next();
  };
};

module.exports = authorizeRoles;
