const jwt = require('jsonwebtoken');
const key = require('../secret-key');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, key);
        req.userData = { username: decodedToken.username, id: decodedToken.id };
        next();
    } catch(err){
        res.status(401).json({
            message: 'Authentication failed!'
        })
    }
}