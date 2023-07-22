const express = require('express');
const CommentControllers = require('../controllers/comment');
const router = express.Router();

router.get('', CommentControllers.getAllComents);
router.get('/multiple', CommentControllers.getMultipleComments);
router.get('/:id', CommentControllers.getComment);

module.exports = router;
