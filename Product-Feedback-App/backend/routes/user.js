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
    try {
        const user = await User.findOne({ username: req.body.username });
        const matched = await bcrypt.compare(req.body.password, user.password);
        
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        if (user.status === 'BANNED') {
            return res.status(401).json({
                message: 'Your account is banned!'
            });
        }

        if (!matched) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }
    
        const token = jwt.sign(
            { username: user.username, id: user._id }, 
            secretKey,
            { expiresIn: '1h' }
        );
    
        res.status(200).json({
            id: user._id,
            token: token,
            expiresIn: 3600
        });
    } catch(error) {
        res.status(500).json({
            error: error
        });
    }
})

router.patch('/status/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        user.status = req.body.status;
        await user.save();
        res.status(200).json({
            message: 'User status changed!'
        })
    } catch(error) {
        res.status(500).json({
            error: error.message,
            message: 'An error occured'
        })
    }
})

router.patch('/role/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        user.role = req.body.role;
        await user.save();
        res.status(200).json({
            message: 'User status changed!'
        })
    } catch(error) {
        res.status(500).json({
            error: error,
            message: 'An error occured'
        })
    }
})

router.get('', async (req, res, next) => {
    try {
        const status = req.query.status;
        if (!status) {
            return res.status(404).json({
                message: 'Some error with status'
            })
        }
        const users = await User.find({ status: status }).select('-password');
        res.status(200).json({
            message: `${status.toLowerCase()} users fetched`,
            users: users,
            occurance: users.length
        })
    } catch(error) {
        res.status(500).json({
            error: error,
            message: 'Error occured :?'
        })
    }
})

router.get('/multiple', async (req, res, next) => {
    try {
        const userIds = req.query.ids.split(',');
        const users = await User.find({ _id: { $in: userIds } }).select('-password');
        res.status(200).json({
            message: 'Multiple users fetched!',
            users: users
        });
    } catch(error) {
        res.status(500).json({
            error: error,
            message: 'An error occurred'
        });
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json({
            message: 'User fetched!',
            user: user
        });
    } catch(error) {
        res.status(500).json({
            error: error,
            message: 'An error occurred'
        })
    }
})

module.exports = router;