const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
      return res.status(403).json({ msg: 'Permission denied. Admins only' });
    }
    next();
  };
  
  module.exports = isAdmin;
  