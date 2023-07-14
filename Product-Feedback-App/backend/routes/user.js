const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../secret-key');

const router = express.Router();

router.post("/signup", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const isUsernameTaken = await User.findOne({ username });
        const isEmailTaken = await User.findOne({ email });

        if (isUsernameTaken) {
            return res.status(400).json({
                message: "This username is already taken."
            })
        }

        if (isEmailTaken) {
            return res.status(400).json({
                message: "This email is already taken."
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ username: username, email: email, password: hashPassword });
        const result = await user.save();
        res.status(201).json({
            message: 'Your account has been created!',
            result: result
        });
    } catch(err) {
        res.status(500).json({
            message: 'Signup failed, something went wrong!'
        });
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials.'
            });
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(401).json({
                message: 'Invalid password.'
            });
        }

        if (user.status === 'BANNED') {
            return res.status(401).json({
                message: 'Your account is banned!!!'
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
            message: 'Login failed, something went wrong!'
        });
    }
})

router.patch('/status/:id', async (req, res, next) => {
    try {
        const user = await User.findById({ _id: req.params.id });
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
            message: "Couldn't change user status!"
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
            message: "Couldn't change user role, only admin can do that!"
        })
    }
})

router.get('', async (req, res, next) => {
    try {
        const status = req.query.status;
        const role = req.query.role;
        if (!status) {
            return res.status(404).json({
                message: 'Some error with status'
            })
        }
        const users = await User.find({ status: status, role: role }).select('-password');
        res.status(200).json({
            message: `${status.toLowerCase()} users fetched`,
            users: users,
            occurance: users.length
        })
    } catch(error) {
        res.status(500).json({
            message: "Couldn't get user."
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
            message: "Couldn't get multiple users"
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
            message: "Couldn't get user, something went wrong."
        })
    }
})

module.exports = router;