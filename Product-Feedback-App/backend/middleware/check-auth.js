const jwt = require('jsonwebtoken');
const key = require('../secret-key');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, key);
        next();
    } catch(err){
        res.status(401).json({
            message: 'Authentication failed!'
        })
    }
}