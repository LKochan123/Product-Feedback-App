const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { username: decodedToken.username, id: decodedToken.id };
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Authentication failed!',
    });
  }
};
