function roleCheck(requiredRoles) {
    return (req, res, next) => {
      const userRole = req.user?.role;
      if (!userRole || !requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Access Denied' });
      }
      next();
    };
  }
  
  module.exports = roleCheck;
  