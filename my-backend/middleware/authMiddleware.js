const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // e.g. "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // user info stored in the token, including role
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  };
};  

module.exports = authMiddleware;
