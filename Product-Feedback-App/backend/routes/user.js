const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../secret-key');

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword
        });
        const result = await user.save();
        res.status(201).json({
            message: 'Your account has been created!',
            result: result
        });
    } catch(err) {
        res.status(500).json({
            error: err
        });
    }
})

router.post("/login", async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        res.status(401).json({
            message: 'User not found'
        });
    }
    const matched = await bcrypt.compare(req.body.password, user.password);
    if (!matched) {
        res.status(401).json({
            message: 'Invalid password'
        });
    }

    const token = jwt.sign(
        { username: user.username, id: user._id }, 
        secretKey,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        token: token,
        expiresIn: 3600
    });
})

module.exports = router;