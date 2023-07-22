const express = require('express');
const UserControllers = require('../controllers/user');
const router = express.Router();

router.post('/signup', UserControllers.createUser);
router.post('/login', UserControllers.loginUser);

router.patch('/status/:id', UserControllers.banUser);
router.patch('/role/:id', UserControllers.manageUserRole);

router.get('', UserControllers.getAllUsers);
router.get('/multiple', UserControllers.getMultipleUsers);
router.get('/:id', UserControllers.getUser);

module.exports = router;
